import express from 'express';
import Skill from '../models/Skill.js';

const router = express.Router();

// GET all skills
router.get('/', async (req, res) => {
  try {
    const { category, level } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (level) {
      query.level = level;
    }
    
    const skills = await Skill.find(query).select('-__v').sort({ category: 1, name: 1 });
    
    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findOne({ id: req.params.id, isActive: true });
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;