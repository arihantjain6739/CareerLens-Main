import express from 'express';
import Role from '../models/Role.js';

const router = express.Router();

// GET all roles
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    
    let query = { isActive: true };
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const roles = await Role.find(query).select('-__v').sort({ name: 1 });
    
    res.json({
      success: true,
      data: roles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findOne({ id: req.params.id, isActive: true });
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    res.json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;