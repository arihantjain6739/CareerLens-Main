# 🎯 CareerLens

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**The AI-Powered Career Readiness Platform**

*Simulate real-world interviews, identify skill gaps, and get a personalized roadmap to success.*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 About

**CareerLens** is an intelligent career preparation platform that leverages AI to help job seekers ace their interviews and land their dream roles. Through interactive mock interviews, comprehensive skills assessments, and personalized feedback, CareerLens transforms the way professionals prepare for career opportunities.

### Why CareerLens?

- 🎥 **AI-Powered Mock Interviews**: Practice with realistic video interviews that analyze your confidence, speaking skills, and answer relevance
- 📊 **Comprehensive Skills Assessment**: Evaluate your technical knowledge with role-specific coding challenges and MCQ tests
- 🎯 **Company-Specific Preparation**: Tailor your prep for target companies like Google, Microsoft, Amazon, and more
- 📈 **Personalized Roadmaps**: Get custom learning paths based on your skill gaps and career goals
- 🔍 **Real-Time Feedback**: Receive instant AI analysis on eye contact, posture, speech clarity, and filler words

---

## ✨ Features

### 🏢 Company Selection
- Choose from top tech companies (FAANG+)
- Get company-specific interview patterns and expectations
- Understand role requirements and culture fit

### 👔 Role Selection
- Software Engineer, Product Manager, Data Scientist, and more
- Role-specific skill requirements and interview prep
- Career progression insights

### 🛠️ Skills Assessment
- Interactive coding challenges (Two Sum, Binary Tree, etc.)
- Multiple-choice questions on algorithms and data structures
- Real-time code execution and validation
- Difficulty levels: Easy, Medium, Hard

### 🎥 AI Interview Setup
- Live camera and microphone preview
- Device selection for optimal setup
- System checks (connection, browser, permissions)
- Privacy-first approach with secure video processing

### 📊 AI Evaluation Criteria
- **Confidence Analysis**: Eye contact consistency and posture stability
- **Answer Relevance**: Topic adherence and knowledge depth
- **Speaking Skills**: Clarity, pace, tone, and filler word detection

### 📈 Results & Feedback
- Detailed performance breakdown
- Skill gap identification
- Personalized learning roadmap
- Progress tracking over time

---

## 🎬 Demo

### User Flow
1. **Landing Page** → Discover features and benefits
2. **Company Selection** → Choose your target company
3. **Role Selection** → Select the position you're applying for
4. **Skills Assessment** → Complete technical challenges and MCQs
5. **Interview Setup** → Configure camera and microphone
6. **Mock Interview** → AI-driven interview simulation
7. **Results Dashboard** → Review feedback and improvement areas

*(Screenshots coming soon)*

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Modern browser** (Chrome, Firefox, Safari, Edge)
- **Webcam & microphone** (for interview features)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/arihantjain6739/CareerLens.git
   cd CareerLens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 💻 Usage

### Running the Application

1. **Start the app**: `npm run dev`
2. **Navigate through the flow**:
   - Select your target company
   - Choose your desired role
   - Complete the skills assessment
   - Set up your interview environment
   - Start your AI mock interview

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production-optimized build |
| `npm run preview` | Preview production build locally |

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.3** - Modern UI library with latest features
- **TypeScript 5.8.2** - Type-safe development
- **React Router DOM 7.12.0** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Custom Components** - Reusable UI elements

### Build Tools
- **Vite 6.2.0** - Lightning-fast build tool and dev server
- **@vitejs/plugin-react** - React fast refresh support

### Development Tools
- **TypeScript** - Static type checking
- **ESLint** - Code linting (optional)
- **Prettier** - Code formatting (optional)

---

## 📁 Project Structure

```
CareerLens/
├── public/               # Static assets
├── components/           # React components
│   ├── CompanySelection.tsx
│   ├── RoleSelection.tsx
│   ├── SkillSelection.tsx
│   ├── TestAssessment.tsx
│   ├── InterviewSetup.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

---

## 🗺️ Roadmap

- [ ] Backend API integration for data persistence
- [ ] User authentication and profiles
- [ ] Advanced AI feedback using LLMs (GPT-4, Claude)
- [ ] Video recording and playback
- [ ] Interview history and analytics
- [ ] Mobile app (React Native)
- [ ] Interview scheduling and reminders
- [ ] Peer-to-peer mock interviews
- [ ] Company-specific interview question database
- [ ] Resume builder and ATS optimization

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
