import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TechQuestion from '../models/TechQuestion.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlens';

const staticCodingQuestion = {
  question: "Two Sum",
  type: "coding",
  difficulty: "easy",
  tags: ["array", "hash-table", "coding"],
  isActive: true,
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists"
  ],
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
    }
  ],
  testCases: [
    {
      input: "[2,7,11,15], 9",
      expectedOutput: "[0,1]",
      explanation: "2 + 7 = 9"
    },
    {
      input: "[3,2,4], 6",
      expectedOutput: "[1,2]",
      explanation: "2 + 4 = 6"
    },
    {
      input: "[3,3], 6",
      expectedOutput: "[0,1]",
      explanation: "3 + 3 = 6"
    },
    {
      input: "[1,5,3,7,9], 10",
      expectedOutput: "[1,3]",
      explanation: "5 + 7 = 10"
    },
    {
      input: "[-1,-2,-3,-4,-5], -8",
      expectedOutput: "[2,4]",
      explanation: "-3 + -5 = -8"
    },
    {
      input: "[0,4,3,0], 0",
      expectedOutput: "[0,3]",
      explanation: "0 + 0 = 0"
    }
  ],
  starterCode: `function twoSum(nums, target) {
    // Write your code here
    // Return an array of two indices [index1, index2]
    
}`,
  hints: [
    "Try using a hash map to store numbers you've seen along with their indices",
    "For each number, check if (target - current number) exists in your hash map",
    "Time complexity can be O(n) with a single pass through the array"
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for Coding Question seeding');

    // Use updateOne with upsert to avoid duplicates
    const result = await TechQuestion.updateOne(
      { question: staticCodingQuestion.question },
      { $setOnInsert: staticCodingQuestion },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log('✅ Static coding question "Two Sum" inserted successfully!');
    } else {
      console.log('ℹ️  Static coding question "Two Sum" already exists.');
    }
  } catch (err) {
    console.error('❌ Failed to seed coding question:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Mongo disconnected');
  }
}

seed();
