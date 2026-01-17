# CareerLens

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.ioa/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991.svg)](https://openai.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**AI-Powered Career Readiness Platform**

*Master your interviews with AI-driven mock interviews, technical assessments, and personalized feedback*

[Features](#features) • [Getting Started](#getting-started) • [Architecture](#architecture) • [API Documentation](#api-documentation) • [Contributing](#contributing)

</div>

---

## Overview

CareerLens is a comprehensive career preparation platform that combines artificial intelligence with real-world interview simulation to help job seekers prepare for their dream roles. The platform offers personalized mock interviews, technical skill assessments, and detailed performance analytics to identify strengths and areas for improvement.

### Key Capabilities

**AI-Powered Interview Simulation**
- Realistic behavioral interview practice with AI-generated questions
- Technical interview sessions tailored to specific roles and companies
- Real-time analysis of speech patterns, confidence, and answer quality

**Comprehensive Technical Assessment**
- Interactive coding challenges with multiple difficulty levels
- Role-specific multiple-choice questions
- Instant validation and detailed explanations

**Intelligent Feedback System**
- Performance metrics including confidence, clarity, and relevance
- Skill gap analysis with personalized recommendations
- Custom learning roadmaps based on assessment results

**Company-Specific Preparation**
- Interview patterns from top tech companies (FAANG and beyond)
- Role-specific requirements and expectations
- Cultural fit insights and preparation tips

---

## Features

### Interview Preparation
- **Behavioral Interviews**: AI-driven questions that adapt to your responses
- **Technical Interviews**: Coding problems and system design discussions
- **HR Questions**: Common screening questions with best practice answers
- **Video Analysis**: Real-time feedback on eye contact, posture, and speaking patterns
- **Speech Evaluation**: Analysis of clarity, pace, tone, and filler word usage

### Skills Assessment
- **Coding Challenges**: Problems ranging from easy to hard difficulty
- **MCQ Tests**: Comprehensive knowledge checks on algorithms and data structures
- **Real-time Execution**: Instant code validation with test case results
- **Progress Tracking**: Monitor your improvement over time

### AI Career Coach
- **Personalized Roadmaps**: Custom learning paths based on skill gaps
- **Interactive Chat**: Ask questions and get expert guidance
- **Resource Recommendations**: Curated learning materials for skill development
- **Interview Tips**: Strategy and best practices for specific roles

### Company & Role Intelligence
- **Company Profiles**: Detailed information on interview processes
- **Role Requirements**: Skills and qualifications for each position
- **Interview Patterns**: Common question types and formats
- **Success Metrics**: What interviewers look for in candidates

---

## Technology Stack

### Frontend
- **React 19.2.3** - Modern UI library with hooks and concurrent features
- **TypeScript 5.8.2** - Type-safe development
- **Vite 6.2.0** - Fast build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **React Router 7.12.0** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.18** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **Mongoose 8.0** - MongoDB object modeling
- **OpenAI API 4.20** - AI-powered features
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Request validation

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **MongoDB Atlas account** (or local MongoDB instance)
- **OpenAI API key** (optional, for AI features)
- **Modern web browser** with webcam and microphone support

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/arihantjain6739/CareerLens-Main.git
cd CareerLens-Main
```

**2. Install frontend dependencies**
```bash
npm install
```

**3. Install backend dependencies**
```bash
cd backend
npm install
```

**4. Configure environment variables**

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerlens?retryWrites=true&w=majority

# OpenAI API Key (optional - falls back to mock data)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**5. Seed the database (optional)**

Populate your database with sample data:
```bash
cd backend
npm run seed
```

This will add:
- 6 tech companies (Google, Amazon, Meta, Microsoft, Netflix, Goldman Sachs)
- 6 professional roles (Software Engineer, Frontend Developer, Data Analyst, etc.)
- 15+ technical and soft skills
- Sample interview questions and coding challenges

**6. Start the development servers**

In one terminal (backend):
```bash
cd backend
npm run dev
```

In another terminal (frontend):
```bash
npm run dev
```

**7. Access the application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## Project Structure

```
CareerLens/
├── backend/                    # Backend API server
│   ├── models/                # MongoDB data models
│   │   ├── Assessment.js      # User assessment records
│   │   ├── Company.js         # Company profiles
│   │   ├── Role.js            # Job role definitions
│   │   ├── Skill.js           # Skill catalog
│   │   ├── Question.js        # Interview questions
│   │   ├── TechQuestion.js    # Technical questions
│   │   └── HRQuestion.js      # HR screening questions
│   ├── routes/                # API route handlers
│   │   ├── companies.js       # Company endpoints
│   │   ├── roles.js           # Role endpoints
│   │   ├── skills.js          # Skills endpoints
│   │   ├── questions.js       # Question endpoints
│   │   ├── assessments.js     # Assessment endpoints
│   │   ├── openai.js          # OpenAI integration
│   │   ├── coach.js           # AI career coach
│   │   └── interview.js       # Interview management
│   ├── services/              # Business logic
│   │   └── openaiService.js   # OpenAI API wrapper
│   ├── scripts/               # Database seeding scripts
│   ├── server.js              # Express server entry point
│   └── package.json           # Backend dependencies
├── components/                 # React components
│   ├── Home.tsx               # Landing page
│   ├── CompanySelection.tsx   # Company picker
│   ├── RoleSelection.tsx      # Role selection
│   ├── SkillSelection.tsx     # Skills assessment
│   ├── TestAssessment.tsx     # MCQ and coding tests
│   ├── InterviewSetup.tsx     # Interview configuration
│   ├── InterviewSession.tsx   # Live interview
│   ├── TechInterviewSession.tsx # Technical interview
│   ├── InterviewFeedback.tsx  # Immediate feedback
│   └── InterviewReport.tsx    # Detailed analytics
├── App.tsx                     # Main application component
├── index.tsx                   # React entry point
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Frontend dependencies
```

---

## Available Scripts

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production-optimized build |
| `npm run preview` | Preview production build locally |

### Backend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend server with auto-reload (nodemon) |
| `npm start` | Start backend server in production mode |
| `npm run seed` | Seed database with sample data |
| `npm run seed:coding` | Seed coding questions only |

---

## API Documentation

The backend API provides comprehensive endpoints for all platform features. Detailed documentation is available in the [backend directory](backend/README.md).

### Core Endpoints

**Companies**
```
GET    /api/companies          # List all companies (supports filtering)
GET    /api/companies/:id      # Get company details
```

**Roles**
```
GET    /api/roles              # List all roles (supports search)
GET    /api/roles/:id          # Get role details
```

**Skills**
```
GET    /api/skills             # List all skills (supports filtering)
GET    /api/skills/:id         # Get skill details
```

**Questions**
```
GET    /api/questions          # List questions (filterable by role, type, difficulty)
GET    /api/questions/:id      # Get question details
POST   /api/questions/:id/validate  # Validate answer
```

**Assessments**
```
POST   /api/assessments        # Create new assessment
GET    /api/assessments/:id    # Get assessment results
POST   /api/assessments/:id/analyze  # AI analysis of results
```

**Interview**
```
POST   /api/interview/generate # Generate interview questions
POST   /api/interview/analyze  # Analyze interview responses
GET    /api/interview/feedback/:id  # Get detailed feedback
```

**AI Career Coach**
```
POST   /api/coach/chat         # Interactive chat with AI coach
POST   /api/coach/roadmap      # Generate learning roadmap
POST   /api/coach/gaps         # Analyze skill gaps
```

**Technical Questions**
```
GET    /api/tech-questions     # Get technical questions
POST   /api/tech-questions/validate  # Validate code solution
```

**HR Questions**
```
GET    /api/hr-questions       # Get HR screening questions
POST   /api/hr-questions/evaluate    # Evaluate response quality
```

For complete API documentation, see [backend/API_REFERENCE.md](backend/API_REFERENCE.md).

---

## Usage Guide

### User Flow

**1. Landing Page**
- Review platform features and benefits
- Understand how CareerLens can help with interview prep

**2. Company Selection**
- Browse available companies or search by name
- Filter by industry category (Tech, Finance, etc.)
- Select your target company

**3. Role Selection**
- View available roles at the selected company
- Review role requirements and skills
- Choose the position you're targeting

**4. Skills Assessment**
- Complete technical coding challenges
- Answer multiple-choice questions
- Receive instant feedback and scoring

**5. Interview Setup**
- Configure camera and microphone
- Test audio/video quality
- Review privacy settings

**6. Mock Interview**
- Answer AI-generated questions
- Practice behavioral and technical scenarios
- Receive real-time confidence and clarity metrics

**7. Results & Feedback**
- Review detailed performance analytics
- Identify skill gaps and improvement areas
- Get personalized learning recommendations
- Access custom roadmap for skill development

---

## Configuration

### Environment Variables

**Backend (.env)**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerlens

# AI Services
OPENAI_API_KEY=sk-your-api-key-here

# CORS
FRONTEND_URL=http://localhost:5173
```

### MongoDB Setup

**Option 1: MongoDB Atlas (Recommended)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Configure network access (allow your IP)
4. Create a database user
5. Get your connection string and add it to `.env`

**Option 2: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/careerlens`

See [backend/MONGODB_SETUP.md](backend/MONGODB_SETUP.md) for detailed instructions.

### OpenAI API Setup

1. Create account at [OpenAI Platform](https://platform.openai.com/)
2. Generate API key from dashboard
3. Add key to backend `.env` file
4. Monitor usage in OpenAI dashboard

**Note**: The application will function with mock data if no OpenAI key is provided, but AI features will be limited.

---

## Development

### Running in Development Mode

**Start both servers concurrently:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Building for Production

**Frontend build:**
```bash
npm run build
```

**Backend setup:**
```bash
cd backend
npm start
```

### Testing

Run assessments and verify functionality:
```bash
# Test with sample data
cd backend
npm run seed

# Verify endpoints
curl http://localhost:5000/api/companies
```

---

## Troubleshooting

### Common Issues

**Port already in use**
```bash
# Find and kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in backend/.env
```

**MongoDB connection fails**
- Verify connection string in `.env`
- Check network access settings in MongoDB Atlas
- Ensure database user credentials are correct
- See [backend/ENV_TROUBLESHOOTING.md](backend/ENV_TROUBLESHOOTING.md)

**OpenAI API errors**
- Verify API key is valid and active
- Check account has available credits
- Review rate limits and quotas
- Application falls back to mock data automatically

**Camera/Microphone not working**
- Grant browser permissions for media access
- Check device privacy settings
- Ensure devices are not used by other applications
- Try different browser (Chrome recommended)

**Build errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

For more help, see [backend/ENV_TROUBLESHOOTING.md](backend/ENV_TROUBLESHOOTING.md) or open an issue.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation as needed
- Ensure all tests pass

### Pull Request Process
- Provide a clear description of changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure CI/CD checks pass
- Request review from maintainers

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **OpenAI** for providing powerful AI capabilities
- **MongoDB** for reliable database services
- **React** and **TypeScript** communities for excellent tools and documentation
- Contributors and users who help improve CareerLens

---

## Support

For questions, issues, or feature requests:

- Open an [Issue](https://github.com/arihantjain6739/CareerLens-Main/issues)
- Review existing [documentation](backend/README.md)
- Check [troubleshooting guides](backend/ENV_TROUBLESHOOTING.md)

---

## Author

**Arihant Jain**
- GitHub: [@arihantjain6739](https://github.com/arihantjain6739)

---

<div align="center">

**Built with dedication to help job seekers succeed**

Made with React, TypeScript, Node.js, MongoDB, and OpenAI

</div>

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Arihant Jain**

- GitHub: [@arihantjain6739](https://github.com/arihantjain6739)
- Repository: [CareerLens](https://github.com/arihantjain6739/CareerLens)

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern SaaS applications
- Built with ❤️ using React and TypeScript

---

## 📧 Contact & Support

Have questions or suggestions? Feel free to:
- Open an [issue](https://github.com/arihantjain6739/CareerLens/issues)
- Submit a [pull request](https://github.com/arihantjain6739/CareerLens/pulls)
- Reach out via GitHub

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with 💙 by developers, for developers

</div>
