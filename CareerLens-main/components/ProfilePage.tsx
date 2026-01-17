import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

interface Assessment {
    id: string;
    date: string;
    company: string;
    role: string;
    type: 'HR' | 'Technical' | 'Skill Assessment';
    score: number;
    duration: string;
}

interface PerformanceData {
    month: string;
    score: number;
}

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    // Mock user data - replace with actual user data from auth/backend
    const [user] = useState({
        name: 'Arihant Jain',
        email: 'arihant@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        joinDate: 'January 2024',
        plan: 'Pro',
        totalInterviews: 24,
        avgScore: 78,
        streak: 7,
    });

    // Mock assessment history
    const [assessments] = useState<Assessment[]>([
        { id: '1', date: '2024-01-15', company: 'Google', role: 'Software Engineer', type: 'Technical', score: 85, duration: '45 min' },
        { id: '2', date: '2024-01-12', company: 'Meta', role: 'Frontend Developer', type: 'HR', score: 78, duration: '30 min' },
        { id: '3', date: '2024-01-10', company: 'Amazon', role: 'SDE II', type: 'Technical', score: 72, duration: '50 min' },
        { id: '4', date: '2024-01-08', company: 'Microsoft', role: 'Software Engineer', type: 'Skill Assessment', score: 88, duration: '25 min' },
        { id: '5', date: '2024-01-05', company: 'Apple', role: 'iOS Developer', type: 'HR', score: 82, duration: '35 min' },
        { id: '6', date: '2024-01-02', company: 'Netflix', role: 'Backend Engineer', type: 'Technical', score: 75, duration: '40 min' },
    ]);

    // Performance data for graph
    const [performanceData] = useState<PerformanceData[]>([
        { month: 'Aug', score: 62 },
        { month: 'Sep', score: 68 },
        { month: 'Oct', score: 65 },
        { month: 'Nov', score: 74 },
        { month: 'Dec', score: 72 },
        { month: 'Jan', score: 78 },
    ]);

    // Calculate trend
    const trend = performanceData[performanceData.length - 1].score - performanceData[0].score;
    const isImproving = trend > 0;

    // Get max score for graph scaling
    const maxScore = Math.max(...performanceData.map(d => d.score));
    const minScore = Math.min(...performanceData.map(d => d.score));

    // Generate SVG path for the graph
    const generatePath = () => {
        const width = 100;
        const height = 60;
        const padding = 5;
        const range = maxScore - minScore || 1;

        const points = performanceData.map((d, i) => {
            const x = padding + (i / (performanceData.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((d.score - minScore) / range) * (height - 2 * padding);
            return `${x},${y}`;
        });

        return `M ${points.join(' L ')}`;
    };

    const generateAreaPath = () => {
        const width = 100;
        const height = 60;
        const padding = 5;
        const range = maxScore - minScore || 1;

        const points = performanceData.map((d, i) => {
            const x = padding + (i / (performanceData.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((d.score - minScore) / range) * (height - 2 * padding);
            return `${x},${y}`;
        });

        return `M ${padding},${height - padding} L ${points.join(' L ')} L ${100 - padding},${height - padding} Z`;
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-green-500/20';
        if (score >= 60) return 'bg-yellow-500/20';
        return 'bg-red-500/20';
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Technical': return 'bg-purple-500/20 text-purple-400';
            case 'HR': return 'bg-blue-500/20 text-blue-400';
            case 'Skill Assessment': return 'bg-orange-500/20 text-orange-400';
            default: return 'bg-neutral-500/20 text-neutral-400';
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            <AnimatedBackground />
            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-12">
                {/* Profile Header */}
                <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-24 h-24 rounded-2xl object-cover border-2 border-neutral-700"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-lg">
                                {user.plan}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                            <p className="text-neutral-400 mb-3">{user.email}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <span className="text-neutral-500">
                                    <span className="text-neutral-400">Member since</span> {user.joinDate}
                                </span>
                                <span className="text-neutral-500">•</span>
                                <span className="text-neutral-400">{user.streak} day streak 🔥</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-all duration-200">
                                <span className="material-symbols-outlined text-lg align-middle mr-1">settings</span>
                                Settings
                            </button>
                            <button className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-all duration-200">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Stats & Graph */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 text-center hover-lift">
                                <div className="text-4xl font-black text-white mb-2">{user.totalInterviews}</div>
                                <div className="text-sm text-neutral-400">Total Interviews</div>
                            </div>
                            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 text-center hover-lift">
                                <div className={`text-4xl font-black mb-2 ${getScoreColor(user.avgScore)}`}>{user.avgScore}%</div>
                                <div className="text-sm text-neutral-400">Average Score</div>
                            </div>
                            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 text-center hover-lift">
                                <div className={`text-4xl font-black mb-2 ${isImproving ? 'text-green-400' : 'text-red-400'}`}>
                                    {isImproving ? '+' : ''}{trend}%
                                </div>
                                <div className="text-sm text-neutral-400">6-Month Trend</div>
                            </div>
                        </div>

                        {/* Performance Graph */}
                        <div className="bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-neutral-800 p-6 overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1">Performance Overview</h2>
                                    <p className="text-sm text-neutral-500">Last 6 months progress</p>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isImproving ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                                    <span className={`material-symbols-outlined text-xl ${isImproving ? 'text-green-400' : 'text-red-400'}`}>
                                        {isImproving ? 'trending_up' : 'trending_down'}
                                    </span>
                                    <span className={`text-sm font-semibold ${isImproving ? 'text-green-400' : 'text-red-400'}`}>
                                        {isImproving ? '+' : ''}{trend}%
                                    </span>
                                </div>
                            </div>

                            {/* Modern Bar Chart */}
                            <div className="relative bg-neutral-950/50 rounded-xl p-6 pb-12">
                                {/* Y-axis labels */}
                                <div className="absolute left-2 top-6 bottom-12 flex flex-col justify-between text-[10px] text-neutral-600">
                                    <span>100%</span>
                                    <span>75%</span>
                                    <span>50%</span>
                                    <span>25%</span>
                                </div>
                                
                                {/* Grid lines */}
                                <div className="absolute left-10 right-6 top-6 bottom-12 flex flex-col justify-between pointer-events-none">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="w-full border-t border-dashed border-neutral-800/50" />
                                    ))}
                                </div>

                                {/* Bars container */}
                                <div className="ml-8 mr-2 h-52 flex items-end justify-around gap-4">
                                    {performanceData.map((d, i) => {
                                        const barHeight = (d.score / 100) * 200; // Height in pixels based on score
                                        const isLast = i === performanceData.length - 1;
                                        return (
                                            <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                                                {/* Bar with fixed pixel height */}
                                                <div className="w-full flex flex-col items-center justify-end h-52">
                                                    {/* Score label */}
                                                    <div className={`mb-2 px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity ${isLast ? 'bg-green-500 text-white' : 'bg-neutral-700 text-white'}`}>
                                                        {d.score}%
                                                    </div>
                                                    
                                                    {/* The bar itself */}
                                                    <div 
                                                        className={`w-full max-w-12 rounded-lg transition-all duration-300 group-hover:scale-105 ${
                                                            isLast 
                                                                ? 'bg-gradient-to-t from-green-600 via-green-500 to-green-400 shadow-lg shadow-green-500/20' 
                                                                : 'bg-gradient-to-t from-neutral-700 via-neutral-600 to-neutral-500 group-hover:from-neutral-600 group-hover:via-neutral-500 group-hover:to-neutral-400'
                                                        }`}
                                                        style={{ height: `${barHeight}px` }}
                                                    />
                                                </div>
                                                
                                                {/* Month label */}
                                                <span className={`mt-3 text-xs font-medium ${isLast ? 'text-green-400' : 'text-neutral-500 group-hover:text-neutral-300'} transition-colors`}>
                                                    {d.month}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="text-center p-4 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 transition-colors">
                                    <div className="text-2xl font-bold text-white mb-1">{Math.min(...performanceData.map(d => d.score))}%</div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Lowest</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 transition-colors">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        {Math.round(performanceData.reduce((a, b) => a + b.score, 0) / performanceData.length)}%
                                    </div>
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Average</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                                    <div className="text-2xl font-bold text-green-400 mb-1">{Math.max(...performanceData.map(d => d.score))}%</div>
                                    <div className="text-xs text-green-500/70 uppercase tracking-wider">Highest</div>
                                </div>
                            </div>
                        </div>

                        {/* Assessment History */}
                        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">Assessment History</h2>
                                <Link to="/selection" className="text-sm text-neutral-400 hover:text-white transition-colors">
                                    Start New Interview →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {assessments.map((assessment) => (
                                    <div
                                        key={assessment.id}
                                        className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200 cursor-pointer group"
                                        onClick={() => navigate('/interview-report')}
                                    >
                                        {/* Company Logo Placeholder */}
                                        <div className="w-12 h-12 bg-neutral-700 rounded-xl flex items-center justify-center text-white font-bold">
                                            {assessment.company.charAt(0)}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-white font-medium truncate">{assessment.company}</h3>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(assessment.type)}`}>
                                                    {assessment.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-neutral-400">
                                                <span>{assessment.role}</span>
                                                <span>•</span>
                                                <span>{assessment.date}</span>
                                                <span>•</span>
                                                <span>{assessment.duration}</span>
                                            </div>
                                        </div>

                                        {/* Score */}
                                        <div className={`px-4 py-2 rounded-xl ${getScoreBg(assessment.score)}`}>
                                            <span className={`text-2xl font-bold ${getScoreColor(assessment.score)}`}>
                                                {assessment.score}%
                                            </span>
                                        </div>

                                        {/* Arrow */}
                                        <span className="material-symbols-outlined text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                                            chevron_right
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {assessments.length >= 6 && (
                                <button className="w-full mt-4 py-3 text-neutral-400 hover:text-white text-sm font-medium transition-colors">
                                    View All History
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Skills & Insights */}
                    <div className="space-y-8">
                        {/* Skills Breakdown */}
                        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Skills Breakdown</h2>

                            <div className="space-y-4">
                                {[
                                    { skill: 'Communication', score: 85 },
                                    { skill: 'Technical Knowledge', score: 72 },
                                    { skill: 'Problem Solving', score: 78 },
                                    { skill: 'Leadership', score: 68 },
                                    { skill: 'Creativity', score: 82 },
                                ].map((item, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-neutral-300">{item.skill}</span>
                                            <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>{item.score}%</span>
                                        </div>
                                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${item.score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Insights */}
                        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-purple-400">auto_awesome</span>
                                <h2 className="text-lg font-semibold text-white">AI Insights</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-green-400">thumb_up</span>
                                        <div>
                                            <h3 className="text-sm font-medium text-green-400 mb-1">Strength</h3>
                                            <p className="text-sm text-neutral-400">Your communication skills have improved by 15% over the last month.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-yellow-400">lightbulb</span>
                                        <div>
                                            <h3 className="text-sm font-medium text-yellow-400 mb-1">Suggestion</h3>
                                            <p className="text-sm text-neutral-400">Practice more system design questions to improve your technical score.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-blue-400">target</span>
                                        <div>
                                            <h3 className="text-sm font-medium text-blue-400 mb-1">Goal</h3>
                                            <p className="text-sm text-neutral-400">3 more interviews to reach your monthly target!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>

                            <div className="space-y-3">
                                <Link
                                    to="/selection"
                                    className="flex items-center gap-3 p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all duration-200 group"
                                >
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">play_arrow</span>
                                    </div>
                                    <span className="text-neutral-300 group-hover:text-white transition-colors">Start New Interview</span>
                                </Link>

                                <Link
                                    to="/skills"
                                    className="flex items-center gap-3 p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all duration-200 group"
                                >
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">assessment</span>
                                    </div>
                                    <span className="text-neutral-300 group-hover:text-white transition-colors">Take Skill Assessment</span>
                                </Link>

                                <Link
                                    to="/how-it-works"
                                    className="flex items-center gap-3 p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all duration-200 group"
                                >
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">school</span>
                                    </div>
                                    <span className="text-neutral-300 group-hover:text-white transition-colors">View Learning Resources</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;
