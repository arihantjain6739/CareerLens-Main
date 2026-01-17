import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CompanySelection from './components/CompanySelection';
import RoleSelection from './components/RoleSelection';
import SkillSelection from './components/SkillSelection';
import TestAssessment from './components/TestAssessment';
import InterviewSetup from './components/InterviewSetup';
import TechInterviewSetup from './components/TechInterviewSetup';
import InterviewSession from './components/InterviewSession';
import InterviewFeedback from './components/InterviewFeedback';
import InterviewReport from './components/InterviewReport';
import TechInterviewSession from './components/TechInterviewSession';
import HowItWorksPage from './components/HowItWorksPage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/selection" element={<CompanySelection />} />
                <Route path="/role" element={<RoleSelection />} />
                <Route path="/skills" element={<SkillSelection />} />
                <Route path="/assessment" element={<TestAssessment />} />
                <Route path="/interviews" element={<InterviewSetup />} />
                <Route path="/tech-interviews" element={<TechInterviewSetup />} />
                <Route path="/interview-session" element={<InterviewSession />} />
                <Route path="/tech-interview-session" element={<TechInterviewSession />} />
                <Route path="/interview-feedback" element={<InterviewFeedback />} />
                <Route path="/interview-report" element={<InterviewReport />} />
                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;