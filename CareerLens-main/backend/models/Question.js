import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['mcq', 'coding']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  constraints: [{
    type: String
  }],
  starterCode: {
    type: String,
    default: ''
  },
  testCases: [{
    input: String,
    output: String
  }],
  tags: [{
    type: String
  }],
  roleId: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Question', questionSchema);