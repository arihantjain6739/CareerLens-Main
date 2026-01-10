import express from 'express';
import mongoose from 'mongoose';
import Company from '../models/Company.js';

const router = express.Router();

// GET all companies
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGODB_URI in .env file or install local MongoDB.',
        data: [] // Return empty array as fallback
      });
    }

    const { category, search } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const companies = await Company.find(query).select('-__v').sort({ name: 1 });
    
    res.json({
      success: true,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch companies'
    });
  }
});

// GET company by ID
router.get('/:id', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGODB_URI in .env file.'
      });
    }

    const company = await Company.findOne({ id: req.params.id, isActive: true });
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }
    
    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch company'
    });
  }
});

export default router;