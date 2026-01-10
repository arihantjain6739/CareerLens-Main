import express from 'express';
import HRQuestion from '../models/HRQuestion.js';
const router = express.Router();

// GET random HR questions
router.get('/random', async (req, res) => {
  try {
    let count = parseInt(req.query.count || '10', 10);
    if (isNaN(count) || count < 1) count = 10;
    count = Math.min(count, 100);

    const total = await HRQuestion.countDocuments({ isActive: true });
    const size = total > 0 ? Math.min(count, total) : count;

    const docs = await HRQuestion.aggregate([
      { $match: { isActive: true } },
      { $sample: { size } },
      { $project: { __v: 0 } }
    ]);

    return res.json({ success: true, data: docs });
  } catch (error) {
    console.error('GET /api/hrquestions/random error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;