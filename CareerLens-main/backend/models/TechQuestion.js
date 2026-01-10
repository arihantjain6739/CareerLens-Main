import mongoose from 'mongoose';

const techQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  difficulty: { type: String, default: 'easy' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('TechQuestion', techQuestionSchema);