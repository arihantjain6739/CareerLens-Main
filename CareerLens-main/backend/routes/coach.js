import express from 'express';
import { chatWithCoach } from '../services/openaiService.js';

const router = express.Router();

// POST chat with AI career coach
router.post('/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Messages array is required'
      });
    }

    // If OpenAI is not configured, return mock response
    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        success: true,
        data: {
          message: 'I\'m here to help you with your career preparation! However, OpenAI API is not configured. Please set up your OPENAI_API_KEY to get personalized AI coaching.',
          context: 'mock'
        },
        message: 'OpenAI not configured - returning mock response'
      });
    }

    const response = await chatWithCoach(messages, context || {});

    res.json({
      success: true,
      data: {
        message: response,
        context: context || {}
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;