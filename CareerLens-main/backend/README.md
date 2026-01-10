# CareerLens Backend API

Sleek, simple backend API for the CareerLens frontend application with OpenAI integration and MongoDB Atlas support.

## 🚀 Features

- **RESTful API** for companies, roles, skills, questions
- **MongoDB Atlas** integration for data persistence
- **OpenAI API** integration for:
  - AI-powered skill gap analysis
  - Personalized learning roadmaps
  - Interview performance analysis
  - AI Career Coach chat
  - Dynamic interview question generation
- **Assessment Management** with scoring and analysis
- **CORS** enabled for frontend integration

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (optional, but recommended for AI features)

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

**Location:** Create the `.env` file in the `backend/` folder (same directory as `server.js` and `package.json`).

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerlens?retryWrites=true&w=majority

# OpenAI API Key (optional - AI features will use mock data if not provided)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Seed Database (Optional)

Populate the database with initial data:

```bash
npm run seed
```

This will add:
- 6 companies (Google, Amazon, Meta, Microsoft, Netflix, Goldman Sachs)
- 6 roles (Software Engineer, Frontend Developer, Data Analyst, etc.)
- 15 skills (Technical, Languages, Soft Skills)
- 4 sample questions (MCQ and coding)

### 4. Start Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000` by default.

## 📡 API Endpoints

### Companies
- `GET /api/companies` - Get all companies (supports `?category=Tech&search=google`)
- `GET /api/companies/:id` - Get company by ID

### Roles
- `GET /api/roles` - Get all roles (supports `?search=engineer`)
- `GET /api/roles/:id` - Get role by ID

### Skills
- `GET /api/skills` - Get all skills (supports `?category=Technical&level=advanced`)
- `GET /api/skills/:id` - Get skill by ID

### Questions
- `GET /api/questions` - Get all questions (supports `?roleId=software-engineer&type=mcq&difficulty=medium`)
- `GET /api/questions/:id` - Get question by ID (without answer)
- `POST /api/questions/:id/validate` - Validate answer

### Assessments
- `POST /api/assessments` - Create new assessment
  ```json
  {
    "companyId": "google",
    "roleId": "software-engineer",
    "selectedSkills": ["algorithms", "system-design"]
  }
  ```
- `POST /api/assessments/:sessionId/submit` - Submit assessment answers
  ```json
  {
    "answers": [
      {
        "questionId": "question_id",
        "answer": 1,
        "timeSpent": 120
      }
    ]
  }
  ```
- `GET /api/assessments/:sessionId` - Get assessment results

### Interview
- `POST /api/interview/feedback` - Analyze interview performance
  ```json
  {
    "roleId": "software-engineer",
    "questionAsked": "Tell me about yourself",
    "answerGiven": "I am a software engineer...",
    "transcript": "Full transcript here"
  }
  ```
- `POST /api/interview/questions/generate` - Generate interview questions
  ```json
  {
    "roleId": "software-engineer",
    "companyId": "google",
    "difficulty": "medium",
    "count": 5
  }
  ```

### AI Career Coach
- `POST /api/coach/chat` - Chat with AI coach
  ```json
  {
    "messages": [
      {"role": "user", "content": "How can I improve my system design skills?"}
    ],
    "context": {
      "roleId": "software-engineer",
      "companyId": "google"
    }
  }
  ```

## 🔌 Frontend Integration

Update your frontend to call these endpoints. Example:

```javascript
// Fetch companies
const response = await fetch('http://localhost:5000/api/companies');
const { data } = await response.json();

// Create assessment
const assessment = await fetch('http://localhost:5000/api/assessments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    companyId: 'google',
    roleId: 'software-engineer',
    selectedSkills: ['algorithms']
  })
});
```

## 🤖 OpenAI Integration

The backend uses OpenAI's GPT-4o-mini model for:
- **Skill Gap Analysis**: Analyzes assessment results and identifies skill gaps
- **Learning Roadmap**: Generates personalized 8-week learning plans
- **Interview Feedback**: Evaluates interview performance on multiple criteria
- **Career Coaching**: Provides personalized career advice via chat
- **Question Generation**: Creates role-specific interview questions

If OpenAI API key is not provided, the endpoints will return mock data with a warning message.

## 📊 Database Models

### Company
- id, name, logo, category, description, isActive

### Role
- id, name, description, image, category, popular, requiredSkills, isActive

### Skill
- id, name, category, level, description, isActive

### Question
- question, type, difficulty, options, correctAnswer, language, examples, constraints, starterCode, testCases, tags, roleId, isActive

### Assessment
- sessionId, companyId, roleId, selectedSkills, answers, score, totalQuestions, skillGapAnalysis, learningRoadmap, completedAt

## 🔒 Security Notes

- API keys are stored in environment variables (never commit `.env`)
- CORS is configured for specific frontend URL
- Input validation should be added for production
- Consider adding authentication for production use

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Verify your MongoDB Atlas connection string
- Check network access in MongoDB Atlas (IP whitelist)
- Ensure username/password are correct

**OpenAI API Errors:**
- Verify your API key is correct
- Check your OpenAI account has credits
- API will gracefully degrade to mock data if unavailable

**Port Already in Use:**
- Change PORT in `.env` file
- Or kill the process using port 5000

## 📝 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!