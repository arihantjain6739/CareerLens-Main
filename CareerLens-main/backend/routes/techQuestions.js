import express from 'express';
import TechQuestion from '../models/TechQuestion.js';
const router = express.Router();

// GET random Tech/CS fundamental questions
router.get('/random', async (req, res) => {
  try {
    let count = parseInt(req.query.count || '20', 10);
    if (isNaN(count) || count < 1) count = 20;
    count = Math.min(count, 100);

    const total = await TechQuestion.countDocuments({ isActive: true });
    const size = total > 0 ? Math.min(count, total) : count;

    const docs = await TechQuestion.aggregate([
      { $match: { isActive: true } },
      { $sample: { size } },
      { $project: { __v: 0 } }
    ]);

    return res.json({ success: true, data: docs });
  } catch (error) {
    console.error('GET /api/techquestions/random error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;