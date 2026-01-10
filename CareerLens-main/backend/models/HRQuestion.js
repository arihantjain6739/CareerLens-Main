import mongoose from 'mongoose';

const hrQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('HRQuestion', hrQuestionSchema);