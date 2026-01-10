import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TechQuestion from '../models/TechQuestion.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlens';

const techQuestions = [
  "What is an algorithm?",
  "What is time complexity and why is it important?",
  "Explain Big O notation with a simple example.",
  "What is the difference between an array and a linked list?",
  "What is a stack and where is it used?",
  "What is a queue and where is it used?",
  "Explain the difference between singly and doubly linked lists.",
  "What is a hash table (hash map) in simple terms?",
  "What is collision in hashing and one way to handle it?",
  "What is recursion and give a basic example scenario?",
  "What is the base case in recursion?",
  "What is a binary tree?",
  "What is a binary search tree (BST)?",
  "What is breadth-first search (BFS) vs depth-first search (DFS)?",
  "What is a graph (basic definition)?",
  "What is a cycle in a graph?",
  "What is sorting? Name two simple sorting algorithms.",
  "How does bubble sort work (briefly)?",
  "How does selection sort work (briefly)?",
  "What is insertion sort and when is it useful?",
  "What is merge sort (conceptually)?",
  "What is quicksort (conceptually)?",
  "What is stable vs unstable sorting?",
  "What is dynamic programming (high level)?",
  "What is memoization?",
  "What is a pointer (in languages like C) in simple terms?",
  "What is stack memory vs heap memory?",
  "What is a memory leak?",
  "What is the purpose of an operating system?",
  "What is a process vs a thread?",
  "What is deadlock in operating systems (brief)?",
  "What is virtual memory (basic idea)?",
  "What is a database?",
  "What is an index in a database and why use it?",
  "What is normalization (high level)?",
  "What is SQL vs NoSQL (basic difference)?",
  "What does ACID stand for (conceptually)?",
  "What is an API (Application Programming Interface)?",
  "What is HTTP and what is a request/response?",
  "What is REST (representational state transfer) in brief?",
  "What is JSON and why is it commonly used?",
  "What is version control and why use Git?",
  "What is a pull request (PR) in Git workflows?",
  "What is object-oriented programming (OOP) — main idea?",
  "Name the four main OOP principles.",
  "What is encapsulation?",
  "What is inheritance?",
  "What is polymorphism (basic explanation)?",
  "What is unit testing and why is it useful?"
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for TechQuestions seeding');

    const ops = techQuestions.map(q => ({
      updateOne: {
        filter: { question: q },
        update: { $setOnInsert: { question: q, tags: ['tech','cs','fundamentals','intern'], difficulty: 'easy', isActive: true } },
        upsert: true
      }
    }));

    const result = await TechQuestion.bulkWrite(ops);
    console.log('Tech questions seed result:', result);
  } catch (err) {
    console.error('Failed to seed tech questions:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Mongo disconnected');
  }
}

seed();