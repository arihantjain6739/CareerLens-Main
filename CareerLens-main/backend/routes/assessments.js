import express from 'express';
import mongoose from 'mongoose';
import Assessment from '../models/Assessment.js';
import Question from '../models/Question.js';
import { analyzeSkillGaps, generateLearningRoadmap } from '../services/openaiService.js';
import { randomUUID } from 'crypto';

const router = express.Router();

// GET all assessments (optional - for testing/list all)
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGODB_URI in .env file or install local MongoDB.'
      });
    }

    const assessments = await Assessment.find().sort({ createdAt: -1 }).limit(100);
    
    res.json({
      success: true,
      data: assessments,
      message: 'Use POST /api/assessments to create a new assessment'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST create new assessment
router.post('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGODB_URI in .env file or install local MongoDB.'
      });
    }

    const { companyId, roleId, selectedSkills } = req.body;

    if (!companyId || !roleId) {
      return res.status(400).json({
        success: false,
        message: 'Company ID and Role ID are required'
      });
    }

    const sessionId = randomUUID();
    
    const assessment = new Assessment({
      sessionId,
      companyId,
      roleId,
      selectedSkills: selectedSkills || []
    });

    await assessment.save();

    res.json({
      success: true,
      data: {
        sessionId,
        assessment
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST submit assessment answers
router.post('/:sessionId/submit', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGODB_URI in .env file or install local MongoDB.'
      });
    }

    const { sessionId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Answers array is required'
      });
    }

    const assessment = await Assessment.findOne({ sessionId });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    // Validate answers and calculate score
    let correctCount = 0;
    const validatedAnswers = [];
    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      
      if (!question) continue;

      const isCorrect = question.type === 'mcq' 
        ? answer.answer === question.correctAnswer
        : true; // For coding questions, assume correct (needs actual validation)

      if (isCorrect) correctCount++;

      validatedAnswers.push({
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        timeSpent: answer.timeSpent || 0
      });
    }

    const score = correctCount;
    const totalQuestions = answers.length;

    // Update assessment
    assessment.answers = validatedAnswers;
    assessment.score = score;
    assessment.totalQuestions = totalQuestions;
    assessment.completedAt = new Date();

    // Generate AI-powered skill gap analysis if OpenAI is configured
    if (process.env.OPENAI_API_KEY) {
      try {
        const skillGapAnalysis = await analyzeSkillGaps({
          companyId: assessment.companyId,
          roleId: assessment.roleId,
          selectedSkills: assessment.selectedSkills,
          answers: validatedAnswers,
          score,
          totalQuestions
        });

        assessment.skillGapAnalysis = skillGapAnalysis;

        // Generate learning roadmap
        const roadmap = await generateLearningRoadmap(skillGapAnalysis, assessment.roleId);
        assessment.learningRoadmap = roadmap;
      } catch (aiError) {
        console.error('AI Analysis Error:', aiError);
        // Continue without AI analysis if it fails
      }
    }

    await assessment.save();

    res.json({
      success: true,
      data: {
        sessionId,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        skillGapAnalysis: assessment.skillGapAnalysis,
        learningRoadmap: assessment.learningRoadmap
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET assessment results
router.get('/:sessionId', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGODB_URI in .env file or install local MongoDB.'
      });
    }

    const assessment = await Assessment.findOne({ sessionId: req.params.sessionId });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    res.json({
      success: true,
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;