import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// GET all questions
router.get('/', async (req, res) => {
  try {
    const { roleId, type, difficulty } = req.query;
    
    let query = { isActive: true };
    
    if (roleId) {
      query.$or = [
        { roleId: roleId },
        { roleId: null }
      ];
    }
    
    if (type) {
      query.type = type;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    const questions = await Question.find(query).select('-correctAnswer -__v').sort({ difficulty: 1 });
    
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

// POST validate answer (for assessment)
router.post('/:id/validate', async (req, res) => {
  try {
    const { answer } = req.body;
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    // For coding questions, we'll do basic validation
    // In production, you'd want actual code execution
    const isCorrect = question.type === 'mcq' 
      ? answer === question.correctAnswer
      : true; // For coding, assume correct if submitted (needs actual execution)
    
    res.json({
      success: true,
      data: {
        isCorrect,
        correctAnswer: question.type === 'mcq' ? question.correctAnswer : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET random sample of questions (for frontend assessments)
router.get('/random', async (req, res) => {
  try {
    let count = parseInt(req.query.count || '20', 10);
    if (isNaN(count) || count < 1) count = 20;

    const total = await Question.countDocuments({ isActive: true });
    const sampleSize = total > 0 ? Math.min(count, total) : Math.min(count, 20);

    const pipeline = [
      { $match: { isActive: true } },
      { $sample: { size: sampleSize } },
      { $project: { correctAnswer: 0, __v: 0 } }
    ];

    const questions = await Question.aggregate(pipeline);
    return res.json({ success: true, data: questions });
  } catch (error) {
    console.error('GET /api/questions/random error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error',
      ...(process.env.NODE_ENV !== 'production' ? { stack: error.stack } : {})
    });
  }
});

// GET question by ID (without answer for frontend)
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).select('-correctAnswer -__v');

    if (!question || !question.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;