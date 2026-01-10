import OpenAI from 'openai';

// Lazy initialization - only create client when API key is available and function is called
let openaiClient = null;

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
    return null;
  }
  
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  return openaiClient;
}

/**
 * Analyze skill gaps based on assessment results
 */
export async function analyzeSkillGaps(assessmentData) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    const { companyId, roleId, selectedSkills, answers, score, totalQuestions } = assessmentData;

    const prompt = `You are an AI career coach analyzing a candidate's assessment results.

Assessment Details:
- Target Company: ${companyId}
- Target Role: ${roleId}
- Selected Skills: ${selectedSkills.join(', ')}
- Score: ${score}/${totalQuestions} (${Math.round((score / totalQuestions) * 100)}%)

Please provide a comprehensive skill gap analysis in the following JSON format:
{
  "overallConfidence": <number 0-100>,
  "skillBreakdown": [
    {
      "name": "<skill name>",
      "category": "<category>",
      "proficiency": <number 0-100>,
      "level": "<BEGINNER|INTERMEDIATE|ADVANCED>",
      "note": "<brief note>",
      "noteType": "<success|info|warning>"
    }
  ],
  "missingSkills": [
    {
      "name": "<skill name>",
      "priority": "<HIGH|MEDIUM|LOW>",
      "reason": "<why this skill is important>"
    }
  ],
  "recommendations": "<overall recommendation text>"
}

Focus on identifying critical gaps for the target role and company.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert career coach and technical recruiter. Provide detailed, actionable skill gap analysis in valid JSON format only.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 2000
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('OpenAI Skill Gap Analysis Error:', error);
    throw new Error('Failed to analyze skill gaps');
  }
}

/**
 * Generate personalized learning roadmap
 */
export async function generateLearningRoadmap(skillGapAnalysis, roleId) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    const prompt = `Based on the following skill gap analysis, create a personalized 8-week learning roadmap for improving skills for the role: ${roleId}

Skill Gap Analysis:
${JSON.stringify(skillGapAnalysis, null, 2)}

Provide a detailed learning roadmap in JSON format:
{
  "roadmap": [
    {
      "week": <number>,
      "title": "<week title>",
      "focusSkills": ["<skill1>", "<skill2>"],
      "activities": ["<activity1>", "<activity2>"],
      "resources": ["<resource1>", "<resource2>"],
      "estimatedHours": <number>
    }
  ],
  "totalEstimatedHours": <number>,
  "keyMilestones": ["<milestone1>", "<milestone2>"]
}

Make it practical, actionable, and focused on bridging the identified gaps.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert learning designer. Create detailed, practical learning roadmaps in valid JSON format only.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 2000
    });

    const roadmap = JSON.parse(response.choices[0].message.content);
    return roadmap;
  } catch (error) {
    console.error('OpenAI Learning Roadmap Error:', error);
    throw new Error('Failed to generate learning roadmap');
  }
}

/**
 * Analyze interview performance from transcript/notes
 */
export async function analyzeInterviewPerformance(interviewData) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    const { transcript, roleId, questionAsked, answerGiven } = interviewData;

    const prompt = `You are an AI interview evaluator analyzing a candidate's interview performance.

Role: ${roleId}
Question: ${questionAsked}
Answer: ${answerGiven}

${transcript ? `Full Transcript:\n${transcript}` : ''}

Evaluate the candidate on the following criteria and provide scores (0-100) and detailed feedback:

1. Answer Relevance: How well did the answer address the question? Was it on-topic and comprehensive?
2. Technical Knowledge: Depth and accuracy of technical understanding demonstrated
3. Communication Clarity: How clear and structured was the response?
4. Confidence: Signs of confidence, hesitation, or uncertainty

Provide response in JSON format:
{
  "scores": {
    "answerRelevance": <number 0-100>,
    "technicalKnowledge": <number 0-100>,
    "communicationClarity": <number 0-100>,
    "confidence": <number 0-100>
  },
  "feedback": {
    "strengths": ["<strength1>", "<strength2>"],
    "weaknesses": ["<weakness1>", "<weakness2>"],
    "improvements": ["<improvement1>", "<improvement2>"]
  },
  "overallScore": <number 0-100>,
  "recommendation": "<overall recommendation>"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert technical interviewer. Provide detailed, constructive feedback in valid JSON format only.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('OpenAI Interview Analysis Error:', error);
    throw new Error('Failed to analyze interview performance');
  }
}

/**
 * AI Career Coach Chat
 */
export async function chatWithCoach(messages, context = {}) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    const systemPrompt = `You are an AI Career Coach helping job seekers improve their skills and prepare for interviews.

${context.roleId ? `The user is preparing for: ${context.roleId}` : ''}
${context.companyId ? `Target company: ${context.companyId}` : ''}
${context.skillGaps ? `Skill gaps identified: ${JSON.stringify(context.skillGaps)}` : ''}

Provide helpful, actionable advice. Be encouraging but honest. Focus on practical steps the user can take.`;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role || 'user',
        content: msg.content
      }))
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: formattedMessages,
      temperature: 0.8,
      max_tokens: 1000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Coach Chat Error:', error);
    throw new Error('Failed to get coach response');
  }
}

/**
 * Generate interview questions for a role
 */
export async function generateInterviewQuestions(roleId, companyId, difficulty = 'medium', count = 5) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    const prompt = `Generate ${count} realistic interview questions for the role "${roleId}" ${companyId ? `at ${companyId}` : ''}.

Difficulty level: ${difficulty}

Include a mix of:
- Technical questions
- Behavioral questions
- Problem-solving scenarios

Provide in JSON format:
{
  "questions": [
    {
      "question": "<question text>",
      "type": "<technical|behavioral|problem-solving>",
      "difficulty": "<easy|medium|hard>",
      "tips": "<what to look for in answer>"
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert interviewer. Generate realistic, relevant interview questions in valid JSON format only.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 2000
    });

    const questions = JSON.parse(response.choices[0].message.content);
    return questions;
  } catch (error) {
    console.error('OpenAI Question Generation Error:', error);
    throw new Error('Failed to generate interview questions');
  }
}