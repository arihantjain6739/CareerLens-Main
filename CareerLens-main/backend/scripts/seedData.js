import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from '../models/Company.js';
import Role from '../models/Role.js';
import Skill from '../models/Skill.js';
import Question from '../models/Question.js';

dotenv.config();

const companies = [
  { id: 'google', name: 'Google', logo: 'https://www.google.com/favicon.ico', category: 'Tech' },
  { id: 'amazon', name: 'Amazon', logo: 'https://www.amazon.com/favicon.ico', category: 'Tech' },
  { id: 'meta', name: 'Meta', logo: 'https://cdn.simpleicons.org/meta', category: 'Tech' },
  { id: 'microsoft', name: 'Microsoft', logo: 'https://www.microsoft.com/favicon.ico', category: 'Tech' },
  { id: 'netflix', name: 'Netflix', logo: 'https://cdn.simpleicons.org/netflix', category: 'Tech' },
  { id: 'goldman', name: 'Goldman Sachs', logo: 'https://cdn.simpleicons.org/goldmansachs', category: 'Finance' }
];

const roles = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    description: 'Focus on algorithms, system design, data structures, and core CS concepts.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    description: 'Focus on React, CSS architecture, performance, and UI/UX implementation.',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=300&fit=crop'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Focus on SQL, Python/R, statistical modeling, and data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Focus on product sense, strategy, roadmap planning, and execution metrics.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
  },
  {
    id: 'backend-engineer',
    name: 'Backend Engineer',
    description: 'Focus on APIs, database architecture, microservices, and scalability.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
  },
  {
    id: 'ux-designer',
    name: 'UX Designer',
    description: 'Focus on user research, wireframing, prototyping, and interaction design.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
  }
];

const skills = [
  { id: 'algorithms', name: 'Algorithms & Data Structures', category: 'Technical', level: 'advanced' },
  { id: 'system-design', name: 'System Design', category: 'Technical', level: 'advanced' },
  { id: 'databases', name: 'Database Design', category: 'Technical', level: 'intermediate' },
  { id: 'api-design', name: 'API Design', category: 'Technical', level: 'intermediate' },
  { id: 'testing', name: 'Testing & Quality Assurance', category: 'Technical', level: 'intermediate' },
  { id: 'security', name: 'Security Best Practices', category: 'Technical', level: 'advanced' },
  { id: 'javascript', name: 'JavaScript/TypeScript', category: 'Languages', level: 'intermediate' },
  { id: 'python', name: 'Python', category: 'Languages', level: 'intermediate' },
  { id: 'java', name: 'Java', category: 'Languages', level: 'intermediate' },
  { id: 'react', name: 'React', category: 'Languages', level: 'intermediate' },
  { id: 'nodejs', name: 'Node.js', category: 'Languages', level: 'intermediate' },
  { id: 'communication', name: 'Communication', category: 'Soft Skills', level: 'intermediate' },
  { id: 'problem-solving', name: 'Problem Solving', category: 'Soft Skills', level: 'advanced' },
  { id: 'leadership', name: 'Leadership', category: 'Soft Skills', level: 'intermediate' },
  { id: 'collaboration', name: 'Team Collaboration', category: 'Soft Skills', level: 'intermediate' }
];

const questions = [
  {
    question: 'What is the time complexity of binary search?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    correctAnswer: 1
  },
  {
    question: 'Which data structure uses LIFO principle?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 1
  },
  {
    question: 'Two Sum\n\nGiven an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    constraints: [
      '2 <= nums.length <= 10⁴',
      '-10⁹ <= nums[i] <= 10⁹',
      '-10⁹ <= target <= 10⁹',
      'Only one valid answer exists.'
    ],
    starterCode: `function twoSum(nums, target) {
    // Write your code here
    
}`,
    testCases: [
      { input: '[2,7,11,15], 9', output: '[0,1]' },
      { input: '[3,2,4], 6', output: '[1,2]' },
      { input: '[3,3], 6', output: '[0,1]' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'What is the purpose of useEffect in React?',
    type: 'mcq',
    difficulty: 'medium',
    options: [
      'To manage state',
      'To handle side effects',
      'To create components',
      'To style components'
    ],
    correctAnswer: 1
  },

  // 50 additional questions (new)
  {
    question: 'What is the average time complexity of quicksort?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'],
    correctAnswer: 1
  },
  {
    question: 'Which traversal of a binary tree yields nodes in sorted order for a BST?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
    correctAnswer: 1
  },
  {
    question: 'Reverse a linked list\n\nGiven the head of a singly linked list, reverse the list and return the reversed list.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: '1->2->3->4->5', output: '5->4->3->2->1' }
    ],
    starterCode: `function reverseList(head) {
  // implement reversal and return new head
}`,
    testCases: [
      { input: '[]', output: '[]' },
      { input: '[1,2]', output: '[2,1]' },
      { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which SQL clause is used to filter rows returned by a query?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['GROUP BY', 'ORDER BY', 'WHERE', 'HAVING'],
    correctAnswer: 2
  },
  {
    question: 'What does ACID stand for in databases?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Atomicity, Consistency, Isolation, Durability', 'Availability, Consistency, Isolation, Durability', 'Atomicity, Concurrency, Integrity, Durability', 'Availability, Concurrency, Isolation, Durability'],
    correctAnswer: 0
  },
  {
    question: 'Implement a function to check if parentheses are balanced in a string.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: '()[]{}', output: 'true' },
      { input: '([)]', output: 'false' }
    ],
    starterCode: `function isValid(s) {
  // return true if brackets are balanced
}`,
    testCases: [
      { input: '"()"', output: 'true' },
      { input: '"()[]{}"', output: 'true' },
      { input: '"(]"', output: 'false' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which HTTP status code indicates a resource was not found?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['200', '301', '404', '500'],
    correctAnswer: 2
  },
  {
    question: 'In REST, which HTTP method is idempotent and typically used to update a resource?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['POST', 'PUT', 'PATCH', 'DELETE'],
    correctAnswer: 1
  },
  {
    question: 'Find the first non-repeating character in a string.',
    type: 'coding',
    difficulty: 'medium',
    examples: [
      { input: '"leetcode"', output: '"l"' },
      { input: '"loveleetcode"', output: '"v"' }
    ],
    starterCode: `function firstUniqChar(s) {
  // return first non-repeating character or -1
}`,
    testCases: [
      { input: '"leetcode"', output: '"l"' },
      { input: '"aabb"', output: '-1' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which of the following is NOT a NoSQL database?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['MongoDB', 'Redis', 'PostgreSQL', 'Cassandra'],
    correctAnswer: 2
  },
  {
    question: 'What is a race condition?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['When code runs slowly', 'When two threads access shared data without proper synchronization', 'When memory leaks occur', 'When a process crashes unexpectedly'],
    correctAnswer: 1
  },
  {
    question: 'Merge two sorted arrays into a single sorted array.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: '[1,3,5], [2,4,6]', output: '[1,2,3,4,5,6]' }
    ],
    starterCode: `function mergeSorted(a, b) {
  // merge and return new sorted array
}`,
    testCases: [
      { input: '[1], [2]', output: '[1,2]' },
      { input: '[1,3], [2,4]', output: '[1,2,3,4]' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'What is memoization used for?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Optimizing recursion by caching results', 'Sorting arrays', 'Managing state in UI', 'Handling HTTP requests'],
    correctAnswer: 0
  },
  {
    question: 'Which data structure is best for implementing a priority queue?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Hash table', 'Binary heap', 'Linked list', 'Stack'],
    correctAnswer: 1
  },
  {
    question: 'Design a URL shortener — what storage and hashing considerations would you propose?',
    type: 'mcq',
    difficulty: 'hard',
    options: ['Use plain sequential IDs, map to DB', 'Use consistent hashing; avoid collisions; use datastore with TTL', 'Store full URLs only in memory', 'Use client-side hashing only'],
    correctAnswer: 1
  },
  {
    question: 'Find the longest palindromic substring in a string.',
    type: 'coding',
    difficulty: 'hard',
    examples: [
      { input: '"babad"', output: '"bab" or "aba"' }
    ],
    starterCode: `function longestPalindrome(s) {
  // return longest palindromic substring
}`,
    testCases: [
      { input: '"babad"', output: '"bab"' },
      { input: '"cbbd"', output: '"bb"' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which algorithm is typically used to find shortest paths in a weighted graph (non-negative weights)?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Prim', 'Kruskal', 'Dijkstra', 'BFS'],
    correctAnswer: 2
  },
  {
    question: 'What is event delegation in the browser?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Delegating events to server', 'Using a single event listener on a parent to handle child events', 'Handling events in web workers', 'Using multiple listeners for same event'],
    correctAnswer: 1
  },
  {
    question: 'Implement binary search on a sorted array.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: '[1,2,3,4,5], target=3', output: '2' }
    ],
    starterCode: `function binarySearch(arr, target) {
  // return index or -1
}`,
    testCases: [
      { input: '[1,2,3], 2', output: '1' },
      { input: '[1,3,5], 4', output: '-1' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which CSS property is used to create a flex container?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['display: block', 'display: inline', 'display: flex', 'position: relative'],
    correctAnswer: 2
  },
  {
    question: 'What is the CAP theorem in distributed systems?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Consistency, Availability, Partition tolerance', 'Caching, Atomicity, Performance', 'Concurrency, Availability, Partitioning', 'Consistency, Accuracy, Performance'],
    correctAnswer: 0
  },
  {
    question: 'Implement a function to detect cycle in a directed graph using DFS.',
    type: 'coding',
    difficulty: 'hard',
    examples: [
      { input: 'graph adjacency list', output: 'true if cycle exists' }
    ],
    starterCode: `function hasCycle(graph) {
  // detect cycle in directed graph
}`,
    testCases: [
      { input: '[[1],[2],[0]]', output: 'true' },
      { input: '[[1],[2],[]]', output: 'false' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which authentication method uses tokens and is stateless on the server?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Sessions with server store', 'JWT (JSON Web Tokens)', 'Basic Auth over HTTP', 'IP-based auth'],
    correctAnswer: 1
  },
  {
    question: 'What is the difference between process and thread?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Threads are heavier than processes', 'Processes share memory, threads do not', 'Processes are independent; threads share memory within a process', 'No difference'],
    correctAnswer: 2
  },
  {
    question: 'Flatten a nested array of integers.',
    type: 'coding',
    difficulty: 'medium',
    examples: [
      { input: '[1,[2,[3]],4]', output: '[1,2,3,4]' }
    ],
    starterCode: `function flatten(arr) {
  // return flattened array
}`,
    testCases: [
      { input: '[1,[2,3]]', output: '[1,2,3]' },
      { input: '[]', output: '[]' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which HTTP header informs the browser about content type?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Content-Length', 'Content-Type', 'Accept', 'Cache-Control'],
    correctAnswer: 1
  },
  {
    question: 'What is lazy loading?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Loading everything at startup', 'Loading resources as needed', 'Preloading all assets', 'Caching all data permanently'],
    correctAnswer: 1
  },
  {
    question: 'Implement an LRU cache with get and put operations.',
    type: 'coding',
    difficulty: 'hard',
    examples: [
      { input: 'capacity=2, ops', output: 'simulate LRU behavior' }
    ],
    starterCode: `class LRUCache {
  constructor(capacity) { }
  get(key) { }
  put(key, value) { }
}`,
    testCases: [
      { input: 'operations', output: 'expected results' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which sorting algorithm has worst-case O(n log n) and is stable?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['QuickSort', 'HeapSort', 'MergeSort', 'SelectionSort'],
    correctAnswer: 2
  },
  {
    question: 'What is CORS and why is it needed?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Security policy for cross-origin requests', 'Protocol for streaming', 'A database replication method', 'A CSS framework'],
    correctAnswer: 0
  },
  {
    question: 'Given a string, return its longest common prefix among an array of strings.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: '["flower","flow","flight"]', output: '"fl"' }
    ],
    starterCode: `function longestCommonPrefix(strs) {
  // return longest common prefix
}`,
    testCases: [
      { input: '["dog","racecar","car"]', output: '""' },
      { input: '["interview","integrate","integer"]', output: '"inte"' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which of the following describes horizontal scaling?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Adding more power (CPU/RAM) to a single server', 'Adding more servers to distribute load', 'Moving database to faster disk', 'Optimizing code only'],
    correctAnswer: 1
  },
  {
    question: 'What is dependency injection used for?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Hardcoding dependencies', 'Making components loosely coupled by injecting dependencies', 'Increasing memory usage', 'Serializing objects'],
    correctAnswer: 1
  },
  {
    question: 'Implement a function to compute n-th Fibonacci number using dynamic programming.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: 'n=6', output: '8' }
    ],
    starterCode: `function fib(n) {
  // compute nth fibonacci efficiently
}`,
    testCases: [
      { input: '0', output: '0' },
      { input: '6', output: '8' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which command initializes a new Node.js project?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['npm start', 'npm init', 'npm install', 'node init'],
    correctAnswer: 1
  },
  {
    question: 'What is throttling vs debouncing in frontend?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Both are same', 'Throttling limits number of calls, debouncing delays until inactivity', 'Debouncing limits calls, throttling delays', 'They are server-side concepts'],
    correctAnswer: 1
  },
  {
    question: 'Serialize and deserialize a binary tree (LeetCode style).',
    type: 'coding',
    difficulty: 'hard',
    examples: [
      { input: 'tree structure', output: 'serialized string' }
    ],
    starterCode: `function serialize(root) { }
function deserialize(data) { }`,
    testCases: [
      { input: 'null', output: 'serialization of null' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which of these is a benefit of using TypeScript?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Runtime performance improvements', 'Static typing and better tooling', 'Requires no build step', 'Removes the need for JavaScript'],
    correctAnswer: 1
  },
  {
    question: 'What is a foreign key in relational databases?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['A key uniquely identifying a row', 'A column that creates a relationship to another table', 'An index for faster search', 'A type of NoSQL key'],
    correctAnswer: 1
  },
  {
    question: 'Implement breadth-first search (BFS) on a graph and return traversal order.',
    type: 'coding',
    difficulty: 'medium',
    examples: [
      { input: 'adjacency list, start node', output: 'bfs order' }
    ],
    starterCode: `function bfs(graph, start) {
  // return order
}`,
    testCases: [
      { input: '[[1,2],[2],[0]]', output: '0,1,2' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which design pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Factory', 'Observer', 'Iterator', 'Singleton'],
    correctAnswer: 2
  },
  {
    question: 'What is a websocket used for?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Stateless HTTP requests', 'Full-duplex communication over a single TCP connection', 'Only file transfers', 'Database replication'],
    correctAnswer: 1
  },
  {
    question: 'Given an array, rotate it to the right by k steps.',
    type: 'coding',
    difficulty: 'medium',
    examples: [
      { input: '[1,2,3,4,5], k=2', output: '[4,5,1,2,3]' }
    ],
    starterCode: `function rotate(nums, k) {
  // rotate array in-place or return new array
}`,
    testCases: [
      { input: '[1,2,3,4,5], 2', output: '[4,5,1,2,3]' },
      { input: '[1], 0', output: '[1]' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'What is the single responsibility principle (SRP)?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['A class should have only one reason to change', 'A function should be static', 'Use only singletons', 'Keep one file per class'],
    correctAnswer: 0
  },
  {
    question: 'Explain CAP tradeoffs when designing a distributed cache.',
    type: 'mcq',
    difficulty: 'hard',
    options: ['Prefer Consistency always', 'Balance availability vs consistency; choose based on use-case', 'Partition tolerance can be ignored', 'Caching removes need for database'],
    correctAnswer: 1
  },
  {
    question: 'Implement quick-select algorithm to find k-th largest element.',
    type: 'coding',
    difficulty: 'hard',
    examples: [
      { input: '[3,2,1,5,6,4], k=2', output: '5' }
    ],
    starterCode: `function findKthLargest(nums, k) {
  // implement quick-select
}`,
    testCases: [
      { input: '[3,2,1,5,6,4],2', output: '5' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which of these is a non-relational data model?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['Relational', 'Document', 'Row-based', 'Column-family relational'],
    correctAnswer: 1
  },
  {
    question: 'What is optimistic concurrency control?',
    type: 'mcq',
    difficulty: 'medium',
    options: ['Locking for every transaction', 'Assume low conflict; validate before commit', 'Serial processing of all transactions', 'Use only single DB instance'],
    correctAnswer: 1
  },
  {
    question: 'Implement a function to check if two strings are anagrams.',
    type: 'coding',
    difficulty: 'easy',
    examples: [
      { input: '"anagram", "nagaram"', output: 'true' }
    ],
    starterCode: `function isAnagram(s, t) {
  // return true if anagrams
}`,
    testCases: [
      { input: '"rat","car"', output: 'false' },
      { input: '"anagram","nagaram"', output: 'true' }
    ],
    language: 'javascript',
    correctAnswer: 0
  },
  {
    question: 'Which technique helps prevent SQL injection?',
    type: 'mcq',
    difficulty: 'easy',
    options: ['String concatenation for queries', 'Parameterized queries / prepared statements', 'Allowing user input as SQL', 'Disabling database logs'],
    correctAnswer: 1
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlens');
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);

    // Clear existing data
    await Company.deleteMany({});
    await Role.deleteMany({});
    await Skill.deleteMany({});
    await Question.deleteMany({});

    // Insert companies
    const insertedCompanies = await Company.insertMany(companies);
    console.log(`✅ Inserted ${insertedCompanies.length} companies`);

    // Insert roles
    const insertedRoles = await Role.insertMany(roles);
    console.log(`✅ Inserted ${insertedRoles.length} roles`);

    // Insert skills
    const insertedSkills = await Skill.insertMany(skills);
    console.log(`✅ Inserted ${insertedSkills.length} skills`);

    // Insert questions
    const insertedQuestions = await Question.insertMany(questions);
    console.log(`✅ Inserted ${insertedQuestions.length} questions`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();