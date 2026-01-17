import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Company {
    id: string;
    name: string;
    logo: string;
    category: string;
}

const companies: Company[] = [
    { id: 'google', name: 'Google', logo: 'https://www.google.com/favicon.ico', category: 'Tech' },
    { id: 'amazon', name: 'Amazon', logo: 'https://www.amazon.com/favicon.ico', category: 'Tech' },
    { id: 'meta', name: 'Meta', logo: 'https://cdn.simpleicons.org/meta', category: 'Tech' },
    { id: 'microsoft', name: 'Microsoft', logo: 'https://www.microsoft.com/favicon.ico', category: 'Tech' },
    { id: 'netflix', name: 'Netflix', logo: 'https://cdn.simpleicons.org/netflix', category: 'Tech' },
    { id: 'goldman', name: 'Goldman Sachs', logo: 'https://cdn.simpleicons.org/goldmansachs', category: 'Finance' },
];

const CompanySelection: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCompany, setSelectedCompany] = useState<string>('google');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const categories = ['All', 'Tech', 'Finance', 'Consulting', 'Healthcare'];

    const filteredCompanies = companies.filter(company => {
        const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory;
        const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleContinue = () => {
        if (selectedCompany) {
            navigate('/role');
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <header className="bg-black border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-xl">C</span>
                            </div>
                            <span className="text-xl font-bold text-white">CareerReady</span>
                        </div>
                        <nav className="flex items-center gap-8">
                            <a href="/" className="text-neutral-400 hover:text-white font-medium transition-colors duration-200">Dashboard</a>
                            <a href="/assessment" className="text-neutral-400 hover:text-white font-medium transition-colors duration-200">Assessments</a>
                            <a href="/interviews" className="text-neutral-400 hover:text-white font-medium transition-colors duration-200">Interviews</a>
                            <a href="/resources" className="text-neutral-400 hover:text-white font-medium transition-colors duration-200">Resources</a>
                            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">
                                <span className="text-neutral-400">👤</span>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">Career Readiness Journey</h2>
                        <span className="text-sm font-medium text-white bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
                            Step 1 of 4
                        </span>
                    </div>
                    <div className="relative">
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: '25%' }}></div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <span className="text-sm font-medium text-white">Company Selection</span>
                            <span className="text-sm text-neutral-500">Skill Gap</span>
                            <span className="text-sm text-neutral-500">Skill Selection</span>
                            <span className="text-sm text-neutral-500">Mock Interview</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Left Column */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Where is your next dream role?
                        </h1>
                        <p className="text-lg text-neutral-400 mb-8">
                            Start by choosing the company you want to prepare for to unlock tailored insights.
                        </p>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search for a company (e.g. Netflix, Spotify)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-12 py-4 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors duration-200"
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        {/* Category Filters */}
                        <div className="flex gap-3 mb-6">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === category
                                            ? 'bg-white text-black'
                                            : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Company Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {filteredCompanies.map((company) => (
                                <button
                                    key={company.id}
                                    onClick={() => setSelectedCompany(company.id)}
                                    className={`relative p-6 bg-neutral-900 rounded-xl border-2 transition-all duration-200 hover:border-neutral-600 ${selectedCompany === company.id
                                            ? 'border-white bg-neutral-800'
                                            : 'border-neutral-800'
                                        }`}
                                >
                                    {selectedCompany === company.id && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center p-3 border border-neutral-700">
                                            <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain" />
                                        </div>
                                        <span className="font-semibold text-white">{company.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Custom Request Link */}
                        <button className="flex items-center gap-2 text-neutral-400 font-medium hover:text-white transition-colors duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                <text x="10" y="14" textAnchor="middle" fontSize="12" fill="currentColor">?</text>
                            </svg>
                            Can't find your company? Add a custom request
                        </button>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-96 space-y-6">
                        {/* Info Card */}
                        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Why choose a company first?
                            </h3>
                            <p className="text-sm text-neutral-400 mb-6">
                                Selecting a target company helps us tailor your skill assessment. We analyze specific interview
                                patterns, cultural fit questions, and technical bars unique to each organization.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-700">
                                        <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Tailored Difficulty</h4>
                                        <p className="text-sm text-neutral-400">
                                            We match the technical bar of the specific company.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-700">
                                        <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Culture Fit</h4>
                                        <p className="text-sm text-neutral-400">
                                            Learn values unique to organizations like Google or McKinsey.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-700">
                                        <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Interview Patterns</h4>
                                        <p className="text-sm text-neutral-400">
                                            Practice with questions recently asked by this company.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Targeting Card */}
                        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
                            <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">
                                TARGETING
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center p-2 border border-neutral-700">
                                    <img
                                        src={companies.find(c => c.id === selectedCompany)?.logo}
                                        alt={`${companies.find(c => c.id === selectedCompany)?.name} logo`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="font-semibold text-white text-lg">
                                    {companies.find(c => c.id === selectedCompany)?.name || 'Google'}
                                </span>
                            </div>
                            <button
                                onClick={handleContinue}
                                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-neutral-200 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Select Role
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanySelection;
