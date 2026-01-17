import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  explanation: { type: String }
}, { _id: false });

const techQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, unique: true },
  type: { type: String, enum: ['conceptual', 'coding'], default: 'conceptual' },
  tags: [{ type: String }],
  difficulty: { type: String, default: 'easy' },
  isActive: { type: Boolean, default: true },
  // Coding question specific fields
  description: { type: String },
  constraints: [{ type: String }],
  examples: [{
    input: { type: String },
    output: { type: String },
    explanation: { type: String }
  }],
  testCases: [testCaseSchema],
  starterCode: { type: String },
  hints: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('TechQuestion', techQuestionSchema);