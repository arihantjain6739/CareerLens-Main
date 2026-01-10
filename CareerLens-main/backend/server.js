import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables FIRST (before any imports that might need them)
dotenv.config();

// Debug: Check if .env file is being loaded (only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log('📝 Environment variables check:');
  console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Not set'}`);
  console.log(`   OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ Set (' + process.env.OPENAI_API_KEY.substring(0, 10) + '...)' : '❌ Not set'}`);
  console.log(`   PORT: ${process.env.PORT || 'Using default (5000)'}`);
  console.log(`   FRONTEND_URL: ${process.env.FRONTEND_URL || 'Using default (http://localhost:3000)'}`);
}

// Import Routes (after dotenv.config())
import companiesRoutes from './routes/companies.js';
import rolesRoutes from './routes/roles.js';
import skillsRoutes from './routes/skills.js';
import questionsRoutes from './routes/questions.js';
import assessmentsRoutes from './routes/assessments.js';
import interviewRoutes from './routes/interview.js';
import coachRoutes from './routes/coach.js';
import hrQuestionsRoutes from './routes/hrQuestions.js';
import techQuestionsRoutes from './routes/techQuestions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware - Allow multiple origins for development
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173', // Vite default port
  FRONTEND_URL
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlens';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Server will continue without database connection');
    console.log('⚠️  Database-dependent endpoints will return errors');
    console.log('💡 To fix: Set MONGODB_URI in .env or install local MongoDB');
  });

// Helper function available globally via mongoose.connection.readyState
// Use: mongoose.connection.readyState === 1 (1 = connected)

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.use('/api/companies', companiesRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/hrquestions', hrQuestionsRoutes);
app.use('/api/techquestions', techQuestionsRoutes);

// mount new openai router
import openaiRouter from './routes/openai.js';
app.use('/api/openai', openaiRouter);

// Debug: Log all registered routes (development only)
if (process.env.NODE_ENV !== 'production') {
  console.log('\n📋 Registered API Routes:');
  console.log('   GET  /health');
  console.log('   GET  /api/companies');
  console.log('   GET  /api/roles');
  console.log('   GET  /api/skills');
  console.log('   GET  /api/questions');
  console.log('   GET  /api/assessments (list all)');
  console.log('   POST /api/assessments (create new)');
  console.log('   POST /api/assessments/:sessionId/submit');
  console.log('   GET  /api/assessments/:sessionId (get results)');
  console.log('   POST /api/interview/feedback');
  console.log('   POST /api/coach/chat\n');
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${FRONTEND_URL}`);
  if (process.env.MONGODB_URI) {
    console.log(`💾 MongoDB: Atlas configured`);
  } else {
    console.log(`💾 MongoDB: Using local fallback (mongodb://localhost:27017/careerlens)`);
  }
  console.log(`📚 Database status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
});