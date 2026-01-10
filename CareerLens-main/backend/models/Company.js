import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Tech', 'Finance', 'Consulting', 'Healthcare', 'Other']
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Company', companySchema);