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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CareerReady</span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Dashboard</a>
              <a href="/assessment" className="text-gray-600 hover:text-gray-900 font-medium">Assessments</a>
              <a href="/interviews" className="text-gray-600 hover:text-gray-900 font-medium">Interviews</a>
              <a href="/resources" className="text-gray-600 hover:text-gray-900 font-medium">Resources</a>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600">👤</span>
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
            <h2 className="text-lg font-semibold text-gray-900">Career Readiness Journey</h2>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Step 2 of 4
            </span>
          </div>
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-sm text-gray-400">Company Selection</span>
              <span className="text-sm font-medium text-blue-600">Role Selection</span>
              <span className="text-sm text-gray-500">Skill Selection</span>
              <span className="text-sm text-gray-500">Mock Interview</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Identify Your Skill Strengths
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Select the skills you're confident in. We'll analyze gaps and create a personalized learning path.
        </p>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">How Skill Assessment Works</h3>
              <p className="text-sm text-gray-700">
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
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
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
              className={`w-full p-4 bg-white rounded-xl border-2 transition-all hover:shadow-md text-left flex items-center justify-between ${
                skill.selected
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  skill.selected
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 bg-white'
                }`}>
                  {skill.selected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  <p className="text-sm text-gray-500">{skill.category}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Count */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Selected Skills</p>
              <p className="text-2xl font-bold text-gray-900">{selectedSkillsCount} of {skills.length}</p>
            </div>
            <button
              onClick={() => setSkills(skills.map(s => ({ ...s, selected: false })))}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/role')}
            className="bg-white text-gray-700 font-semibold py-3 px-8 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={selectedSkillsCount === 0}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
