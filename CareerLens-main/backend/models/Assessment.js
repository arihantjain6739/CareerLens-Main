import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  companyId: {
    type: String,
    required: true
  },
  roleId: {
    type: String,
    required: true
  },
  selectedSkills: [{
    type: String
  }],
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    timeSpent: Number
  }],
  score: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  skillGapAnalysis: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  learningRoadmap: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('Assessment', assessmentSchema);