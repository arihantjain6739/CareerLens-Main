import dotenv from 'dotenv';
import mongoose from 'mongoose';
import HRQuestion from '../models/HRQuestion.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlens';

const hrQuestions = [
  "Tell me about yourself.",
  "Why do you want to work for our company?",
  "What are your greatest strengths?",
  "What is your biggest weakness?",
  "Describe a time you faced a conflict at work and how you handled it.",
  "Tell me about a time you showed leadership.",
  "How do you handle tight deadlines?",
  "Describe a time you failed and what you learned.",
  "How do you prioritize tasks?",
  "Where do you see yourself in five years?",
  "Why are you leaving your current job?",
  "What motivates you?",
  "How do you handle constructive criticism?",
  "Describe a time you worked in a team to achieve a goal.",
  "How do you manage stress?",
  "Tell me about a time you went above and beyond.",
  "What do you consider your biggest professional achievement?",
  "How do you handle ambiguity at work?",
  "Describe a time you had to learn a new skill quickly.",
  "How do you adapt to change?",
  "What is your preferred management style?",
  "How do you handle disagreements with a manager?",
  "Describe a situation where you had to influence others.",
  "What are your salary expectations?",
  "How do you stay organized?",
  "Tell me about a time you had to make a difficult decision.",
  "How do you handle multitasking?",
  "Describe a time you improved a process.",
  "What do you know about our company culture?",
  "How do you handle repetitive tasks?",
  "Tell me about a time you delivered bad news.",
  "How do you keep your skills up to date?",
  "Describe a time you handled a difficult customer or stakeholder.",
  "What are three words your colleagues would use to describe you?",
  "How do you approach setting and achieving goals?",
  "Describe a time you managed a project end-to-end.",
  "How do you ensure quality in your work?",
  "Tell me about a time you took initiative.",
  "How do you handle confidential information?",
  "What do you do when you disagree with company policy?",
  "Describe a time you handled a high-pressure situation.",
  "How do you measure success in your role?",
  "What makes you a good fit for this position?",
  "How do you balance short-term tasks with long-term goals?",
  "Tell me about a time you coached or mentored someone.",
  "How do you handle learning from feedback?",
  "Describe a time you handled an ethical dilemma.",
  "What questions do you have for us?"
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for HR seeding');

    const ops = hrQuestions.map(q => ({
      updateOne: {
        filter: { question: q },
        update: { $setOnInsert: { question: q, tags: ['hr', 'behavioral'], isActive: true } },
        upsert: true
      }
    }));

    const result = await HRQuestion.bulkWrite(ops);
    console.log('HR questions seed result:', result);
  } catch (err) {
    console.error('Failed to seed HR questions:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Mongo disconnected');
  }
}

seed();