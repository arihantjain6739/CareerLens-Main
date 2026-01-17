import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const HowItWorksPage: React.FC = () => {
    const steps = [
        {
            number: '01',
            title: 'Create Your Profile',
            description: 'Sign up and tell us about your career goals, target companies, and current skill set. Our AI analyzes your profile to create a personalized learning path.',
            icon: 'person_add',
        },
        {
            number: '02',
            title: 'Select Your Target Role',
            description: 'Choose from hundreds of roles across top companies. We customize your preparation based on specific interview patterns and requirements for each position.',
            icon: 'work',
        },
        {
            number: '03',
            title: 'Assess Your Skills',
            description: 'Take our comprehensive skill assessment to identify your strengths and areas for improvement. Get detailed analytics on where you stand.',
            icon: 'assessment',
        },
        {
            number: '04',
            title: 'Practice with AI Interviews',
            description: 'Engage in realistic mock interviews powered by AI. Receive instant feedback on your responses, body language, and communication skills.',
            icon: 'smart_toy',
        },
        {
            number: '05',
            title: 'Track Your Progress',
            description: 'Monitor your improvement over time with detailed analytics and performance reports. See exactly how ready you are for your target role.',
            icon: 'trending_up',
        },
        {
            number: '06',
            title: 'Land Your Dream Job',
            description: 'With comprehensive preparation and confidence, ace your real interviews and secure offers from top companies.',
            icon: 'celebration',
        },
    ];

    const features = [
        {
            title: 'AI-Powered Feedback',
            description: 'Our advanced AI analyzes your responses in real-time, providing actionable insights to improve your interview performance.',
            icon: 'psychology',
        },
        {
            title: 'Company-Specific Prep',
            description: 'Get tailored preparation materials based on actual interview questions and patterns from your target companies.',
            icon: 'business',
        },
        {
            title: 'Progress Analytics',
            description: 'Track your improvement with detailed dashboards showing your strengths, weaknesses, and readiness score.',
            icon: 'analytics',
        },
    ];

    return (
        <div className="relative min-h-screen bg-black">
            <AnimatedBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="w-full px-4 md:px-10 py-20 md:py-28 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        How <span className="text-neutral-400">Credify</span> Works
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                        A simple, effective process to prepare you for your dream job.
                        From skill assessment to mock interviews, we've got you covered.
                    </p>
                    <Link
                        to="/selection"
                        className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-white text-black text-base font-semibold hover:bg-neutral-200 transition-all duration-200"
                    >
                        Get Started Free
                    </Link>
                </div>
            </section>

            {/* Steps Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-neutral-950 border-y border-neutral-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Journey to Success</h2>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            Follow these six steps to transform your interview preparation and land your dream role.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="group relative p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center font-bold text-lg">
                                    {step.number}
                                </div>
                                <div className="pt-6">
                                    <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neutral-700 transition-colors duration-200">
                                        <span className="material-symbols-outlined text-neutral-400 group-hover:text-white transition-colors duration-200">
                                            {step.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Makes Us Different</h2>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            Credify combines cutting-edge AI with proven interview strategies to give you an unfair advantage.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center p-8 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
                            >
                                <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="material-symbols-outlined text-3xl text-white">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-neutral-950 border-t border-neutral-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-neutral-400 text-lg mb-8">
                        Join thousands of professionals who have accelerated their careers with Credify.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/selection"
                            className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-white text-black text-base font-semibold hover:bg-neutral-200 transition-all duration-200"
                        >
                            Start Your Free Assessment
                        </Link>
                        <Link
                            to="/pricing"
                            className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-transparent text-white border border-neutral-700 text-base font-medium hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-200"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HowItWorksPage;
