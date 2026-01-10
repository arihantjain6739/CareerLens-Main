# API Reference - CareerLens Backend

Base URL: `http://localhost:5000/api`

All responses follow this format:
```json
{
  "success": true,
  "data": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 📋 Companies

### GET /companies
Get all companies with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (Tech, Finance, Consulting, Healthcare, Other, or "All")
- `search` (optional): Search companies by name

**Example:**
```bash
GET /api/companies?category=Tech&search=google
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "id": "google",
      "name": "Google",
      "logo": "https://...",
      "category": "Tech",
      "description": "",
      "isActive": true
    }
  ]
}
```

### GET /companies/:id
Get a specific company by ID.

---

## 👔 Roles

### GET /roles
Get all roles with optional search.

**Query Parameters:**
- `search` (optional): Search roles by name

**Example:**
```bash
GET /api/roles?search=engineer
```

### GET /roles/:id
Get a specific role by ID.

---

## 🛠️ Skills

### GET /skills
Get all skills with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (Technical, Languages, Soft Skills, Domain, Other, or "All")
- `level` (optional): Filter by level (beginner, intermediate, advanced)

**Example:**
```bash
GET /api/skills?category=Technical&level=advanced
```

### GET /skills/:id
Get a specific skill by ID.

---

## ❓ Questions

### GET /questions
Get all questions (answers excluded).

**Query Parameters:**
- `roleId` (optional): Filter by role ID
- `type` (optional): Filter by type (mcq, coding)
- `difficulty` (optional): Filter by difficulty (easy, medium, hard)

**Example:**
```bash
GET /api/questions?roleId=software-engineer&type=mcq&difficulty=medium
```

### GET /questions/:id
Get a specific question (without correct answer).

### POST /questions/:id/validate
Validate an answer to a question.

**Request Body:**
```json
{
  "answer": 1  // For MCQ: option index. For coding: solution code
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isCorrect": true,
    "correctAnswer": 1
  }
}
```

---

## 📊 Assessments

### POST /assessments
Create a new assessment session.

**Request Body:**
```json
{
  "companyId": "google",
  "roleId": "software-engineer",
  "selectedSkills": ["algorithms", "system-design"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "uuid-string",
    "assessment": { ... }
  }
}
```

### POST /assessments/:sessionId/submit
Submit assessment answers and get AI-powered analysis.

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "question_id_here",
      "answer": 1,
      "timeSpent": 120  // seconds
    },
    {
      "questionId": "another_question_id",
      "answer": "function twoSum(nums, target) { ... }",
      "timeSpent": 300
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "uuid-string",
    "score": 3,
    "totalQuestions": 4,
    "percentage": 75,
    "skillGapAnalysis": {
      "overallConfidence": 82,
      "skillBreakdown": [ ... ],
      "missingSkills": [ ... ],
      "recommendations": "..."
    },
    "learningRoadmap": {
      "roadmap": [ ... ],
      "totalEstimatedHours": 120,
      "keyMilestones": [ ... ]
    }
  }
}
```

### GET /assessments/:sessionId
Get assessment results by session ID.

---

## 🎥 Interview

### POST /interview/feedback
Analyze interview performance using AI.

**Request Body:**
```json
{
  "roleId": "software-engineer",
  "questionAsked": "Tell me about yourself",
  "answerGiven": "I am a software engineer with 5 years of experience...",
  "transcript": "Full interview transcript here (optional)",
  "videoAnalysis": { ... }  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "scores": {
      "answerRelevance": 85,
      "technicalKnowledge": 78,
      "communicationClarity": 90,
      "confidence": 82
    },
    "feedback": {
      "strengths": ["Clear articulation", "Good examples"],
      "weaknesses": ["Could use more technical depth"],
      "improvements": ["Provide more specific examples"]
    },
    "overallScore": 84,
    "recommendation": "Strong performance overall..."
  }
}
```

### POST /interview/questions/generate
Generate AI-powered interview questions for a role.

**Request Body:**
```json
{
  "roleId": "software-engineer",
  "companyId": "google",  // optional
  "difficulty": "medium",  // easy, medium, hard
  "count": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "Tell me about a challenging project...",
        "type": "behavioral",
        "difficulty": "medium",
        "tips": "Look for problem-solving skills..."
      }
    ]
  }
}
```

---

## 🤖 AI Career Coach

### POST /coach/chat
Chat with AI career coach.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "How can I improve my system design skills?"
    }
  ],
  "context": {
    "roleId": "software-engineer",
    "companyId": "google",
    "skillGaps": ["system-design", "distributed-systems"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Here's a personalized plan to improve your system design skills...",
    "context": { ... }
  }
}
```

---

## 🏥 Health Check

### GET /health
Check server and database status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"  // or "disconnected"
}
```

---

## 💡 Usage Examples

### Complete Assessment Flow

```javascript
// 1. Create assessment
const assessment = await fetch('http://localhost:5000/api/assessments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    companyId: 'google',
    roleId: 'software-engineer',
    selectedSkills: ['algorithms', 'system-design']
  })
}).then(r => r.json());

const sessionId = assessment.data.sessionId;

// 2. Submit answers
const results = await fetch(`http://localhost:5000/api/assessments/${sessionId}/submit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    answers: [
      { questionId: 'q1', answer: 1, timeSpent: 120 },
      { questionId: 'q2', answer: 1, timeSpent: 90 }
    ]
  })
}).then(r => r.json());

// 3. Get skill gap analysis and learning roadmap
console.log(results.data.skillGapAnalysis);
console.log(results.data.learningRoadmap);
```

### Chat with AI Coach

```javascript
const response = await fetch('http://localhost:5000/api/coach/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'I need help with system design interviews' }
    ],
    context: {
      roleId: 'software-engineer',
      companyId: 'google'
    }
  })
}).then(r => r.json());

console.log(response.data.message);
```