import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Skill {
    id: string;
    name: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    selected: boolean;
}

const SkillSelection: React.FC = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState<Skill[]>([
        // Technical Skills
        { id: 'algorithms', name: 'Algorithms & Data Structures', category: 'Technical', level: 'advanced', selected: false },
        { id: 'system-design', name: 'System Design', category: 'Technical', level: 'advanced', selected: false },
        { id: 'databases', name: 'Database Design', category: 'Technical', level: 'intermediate', selected: false },
        { id: 'api-design', name: 'API Design', category: 'Technical', level: 'intermediate', selected: false },
        { id: 'testing', name: 'Testing & Quality Assurance', category: 'Technical', level: 'intermediate', selected: false },
        { id: 'security', name: 'Security Best Practices', category: 'Technical', level: 'advanced', selected: false },

        // Languages & Frameworks
        { id: 'javascript', name: 'JavaScript/TypeScript', category: 'Languages', level: 'intermediate', selected: false },
        { id: 'python', name: 'Python', category: 'Languages', level: 'intermediate', selected: false },
        { id: 'java', name: 'Java', category: 'Languages', level: 'intermediate', selected: false },
        { id: 'react', name: 'React', category: 'Languages', level: 'intermediate', selected: false },
        { id: 'nodejs', name: 'Node.js', category: 'Languages', level: 'intermediate', selected: false },

        // Soft Skills
        { id: 'communication', name: 'Communication', category: 'Soft Skills', level: 'intermediate', selected: false },
        { id: 'problem-solving', name: 'Problem Solving', category: 'Soft Skills', level: 'advanced', selected: false },
        { id: 'leadership', name: 'Leadership', category: 'Soft Skills', level: 'intermediate', selected: false },
        { id: 'collaboration', name: 'Team Collaboration', category: 'Soft Skills', level: 'intermediate', selected: false },
    ]);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Technical', 'Languages', 'Soft Skills'];

    const toggleSkill = (id: string) => {
        setSkills(skills.map(skill =>
            skill.id === id ? { ...skill, selected: !skill.selected } : skill
        ));
    };

    const filteredSkills = skills.filter(skill =>
        selectedCategory === 'All' || skill.category === selectedCategory
    );

    const selectedSkillsCount = skills.filter(s => s.selected).length;

    const handleContinue = () => {
        navigate('/assessment');
    };

    const getLevelStyles = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-neutral-800 text-neutral-300 border border-neutral-700';
            case 'intermediate': return 'bg-neutral-800 text-neutral-300 border border-neutral-700';
            case 'advanced': return 'bg-neutral-700 text-neutral-200 border border-neutral-600';
            default: return 'bg-neutral-800 text-neutral-400';
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
                            Step 3 of 4
                        </span>
                    </div>
                    <div className="relative">
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <span className="text-sm text-neutral-500">Company Selection</span>
                            <span className="text-sm text-neutral-500">Role Selection</span>
                            <span className="text-sm font-medium text-white">Skill Selection</span>
                            <span className="text-sm text-neutral-500">Mock Interview</span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-3">
                    Identify Your Skill Strengths
                </h1>
                <p className="text-lg text-neutral-400 mb-8">
                    Select the skills you're confident in. We'll analyze gaps and create a personalized learning path.
                </p>

                {/* Info Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-black text-sm font-bold">i</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-white mb-2">How Skill Assessment Works</h3>
                            <p className="text-sm text-neutral-400">
                                Select skills you're comfortable with. Our AI will compare your selections against the requirements for your target role at your chosen company, identifying areas for improvement and creating a customized study plan.
                            </p>
                        </div>
                    </div>
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

                {/* Skills Grid */}
                <div className="space-y-3 mb-8">
                    {filteredSkills.map((skill) => (
                        <button
                            key={skill.id}
                            onClick={() => toggleSkill(skill.id)}
                            className={`w-full p-4 bg-neutral-900 rounded-xl border-2 transition-all duration-200 hover:border-neutral-600 text-left flex items-center justify-between ${skill.selected
                                    ? 'border-white bg-neutral-800'
                                    : 'border-neutral-800'
                                }`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${skill.selected
                                        ? 'bg-white border-white'
                                        : 'border-neutral-600 bg-transparent'
                                    }`}>
                                    {skill.selected && (
                                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">{skill.name}</h3>
                                    <p className="text-sm text-neutral-500">{skill.category}</p>
                                </div>
                            </div>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-md ${getLevelStyles(skill.level)}`}>
                                {skill.level}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Selected Count */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-neutral-400">Selected Skills</p>
                            <p className="text-2xl font-bold text-white">{selectedSkillsCount} of {skills.length}</p>
                        </div>
                        <button
                            onClick={() => setSkills(skills.map(s => ({ ...s, selected: false })))}
                            className="text-sm text-neutral-400 hover:text-white font-medium transition-colors duration-200"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate('/role')}
                        className="bg-transparent text-white font-semibold py-3 px-8 rounded-xl border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-200"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleContinue}
                        disabled={selectedSkillsCount === 0}
                        className="bg-white text-black font-semibold py-3 px-8 rounded-xl hover:bg-neutral-200 transition-all duration-200 flex items-center gap-2 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed"
                    >
                        Continue to Assessment
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillSelection;
