import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Role {
    id: string;
    name: string;
    description: string;
    image: string;
    popular?: boolean;
}

const roles: Role[] = [
    {
        id: 'software-engineer',
        name: 'Software Engineer',
        description: 'Focus on algorithms, system design, data structures, and core CS concepts.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        popular: true,
    },
    {
        id: 'frontend-developer',
        name: 'Frontend Developer',
        description: 'Focus on React, CSS architecture, performance, and UI/UX implementation.',
        image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=300&fit=crop',
    },
    {
        id: 'data-analyst',
        name: 'Data Analyst',
        description: 'Focus on SQL, Python/R, statistical modeling, and data visualization.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    },
    {
        id: 'product-manager',
        name: 'Product Manager',
        description: 'Focus on product sense, strategy, roadmap planning, and execution metrics.',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    },
    {
        id: 'backend-engineer',
        name: 'Backend Engineer',
        description: 'Focus on APIs, database architecture, microservices, and scalability.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    },
    {
        id: 'ux-designer',
        name: 'UX Designer',
        description: 'Focus on user research, wireframing, prototyping, and interaction design.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    },
];

const RoleSelection: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<string>('software-engineer');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleContinue = () => {
        if (selectedRole) {
            navigate('/skills');
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
                            <a href="/practice" className="text-neutral-400 hover:text-white font-medium transition-colors duration-200">Practice</a>
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
                            Step 2 of 4
                        </span>
                    </div>
                    <div className="relative">
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: '50%' }}></div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <span className="text-sm text-neutral-500">Company Selection</span>
                            <span className="text-sm font-medium text-white">Role Selection</span>
                            <span className="text-sm text-neutral-500">Skill Selection</span>
                            <span className="text-sm text-neutral-500">Mock Interview</span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-3">
                    Define Your Career Path
                </h1>
                <p className="text-lg text-neutral-400 mb-8">
                    Select the role you are targeting to customize your preparation plan.
                </p>

                {/* Info Box */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-black text-sm font-bold">i</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-2">Why this matters</h3>
                            <p className="text-sm text-neutral-400 mb-4">
                                Your role selection powers our AI engine. We use this specific data point to tailor your skill gap analysis, technical
                                questions, and evaluation criteria to current industry standards for that specific job family.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 ml-9">
                        <div className="flex items-start gap-2">
                            <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-700">
                                <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white text-sm">Tailored Content</h4>
                                <p className="text-xs text-neutral-500">Role-specific questions</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-700">
                                <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white text-sm">Relevant Benchmarks</h4>
                                <p className="text-xs text-neutral-500">Compare with peers</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-700">
                                <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white text-sm">Focused Analytics</h4>
                                <p className="text-xs text-neutral-500">Identify critical gaps</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search for a specific role (e.g. 'Backend Engineer')"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-12 py-3.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors duration-200"
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

                {/* Role Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {filteredRoles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`relative p-0 bg-neutral-900 rounded-xl border-2 transition-all duration-200 text-left overflow-hidden group hover:border-neutral-600 ${selectedRole === role.id
                                    ? 'border-white bg-neutral-800'
                                    : 'border-neutral-800'
                                }`}
                        >
                            {/* Image */}
                            <div className="relative h-32 bg-neutral-800 overflow-hidden">
                                <img
                                    src={role.image}
                                    alt={role.name}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-200"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                                {role.popular && (
                                    <div className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
                                        Popular
                                    </div>
                                )}
                                {selectedRole === role.id && (
                                    <div className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white mb-1">{role.name}</h3>
                                        <p className="text-sm text-neutral-400 leading-relaxed">
                                            {role.description}
                                        </p>
                                    </div>
                                    <svg
                                        className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors flex-shrink-0 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Request Link */}
                <div className="text-center mb-8">
                    <button className="text-neutral-500 hover:text-white text-sm font-medium transition-colors duration-200">
                        Don't see your role? <span className="text-neutral-300 hover:text-white">Request a new role track</span>
                    </button>
                </div>

                {/* Continue Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedRole}
                        className="bg-white text-black font-semibold py-3 px-8 rounded-xl hover:bg-neutral-200 transition-all duration-200 flex items-center gap-2 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed"
                    >
                        Continue
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
