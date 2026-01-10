import express from 'express';
import { analyzeInterviewPerformance, generateInterviewQuestions } from '../services/openaiService.js';

const router = express.Router();

// POST analyze interview feedback
router.post('/feedback', async (req, res) => {
  try {
    const { transcript, roleId, questionAsked, answerGiven, videoAnalysis } = req.body;

    if (!roleId || !questionAsked || !answerGiven) {
      return res.status(400).json({
        success: false,
        message: 'Role ID, question, and answer are required'
      });
    }

    // If OpenAI is not configured, return mock data
    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        success: true,
        data: {
          scores: {
            answerRelevance: 75,
            technicalKnowledge: 70,
            communicationClarity: 80,
            confidence: 72
          },
          feedback: {
            strengths: ['Clear articulation', 'Good structure'],
            weaknesses: ['Could use more examples', 'Technical depth could improve'],
            improvements: ['Provide specific examples', 'Explain technical concepts in detail']
          },
          overallScore: 74,
          recommendation: 'Good performance overall. Focus on providing more concrete examples and deeper technical explanations.'
        },
        message: 'OpenAI not configured - returning mock data'
      });
    }

    const analysis = await analyzeInterviewPerformance({
      transcript,
      roleId,
      questionAsked,
      answerGiven,
      videoAnalysis
    });

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST generate interview questions
router.post('/questions/generate', async (req, res) => {
  try {
    const { roleId, companyId, difficulty = 'medium', count = 5 } = req.body;

    if (!roleId) {
      return res.status(400).json({
        success: false,
        message: 'Role ID is required'
      });
    }

    // If OpenAI is not configured, return mock data
    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        success: true,
        data: {
          questions: [
            {
              question: 'Tell me about yourself and why you\'re interested in this role.',
              type: 'behavioral',
              difficulty: 'easy',
              tips: 'Look for clear communication, relevant experience, and genuine interest'
            },
            {
              question: 'Describe a challenging project you worked on.',
              type: 'behavioral',
              difficulty: 'medium',
              tips: 'Look for problem-solving skills, technical depth, and results'
            }
          ]
        },
        message: 'OpenAI not configured - returning mock data'
      });
    }

    const questions = await generateInterviewQuestions(roleId, companyId, difficulty, count);

    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;