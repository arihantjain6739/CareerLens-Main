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
              <a href="/practice" className="text-gray-600 hover:text-gray-900 font-medium">Practice</a>
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
              <span className="text-sm text-gray-500">Company Selection</span>
              <span className="text-sm font-medium text-blue-600">Role Selection</span>
              <span className="text-sm text-gray-500">Skill Selection</span>
              <span className="text-sm text-gray-500">Mock Interview</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Define Your Career Path
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Select the role you are targeting to customize your preparation plan.
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Why this matters</h3>
              <p className="text-sm text-gray-700 mb-4">
                Your role selection powers our AI engine. We use this specific data point to tailor your skill gap analysis, technical
                questions, and evaluation criteria to current industry standards for that specific job family.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 ml-9">
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Tailored Content</h4>
                <p className="text-xs text-gray-600">Role-specific questions</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Relevant Benchmarks</h4>
                <p className="text-xs text-gray-600">Compare with peers</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Focused Analytics</h4>
                <p className="text-xs text-gray-600">Identify critical gaps</p>
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
            className="w-full px-12 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
              className={`relative p-0 bg-white rounded-xl border-2 transition-all hover:shadow-lg text-left overflow-hidden group ${
                selectedRole === role.id
                  ? 'border-blue-600 shadow-lg'
                  : 'border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="relative h-32 bg-gray-200 overflow-hidden">
                <img
                  src={role.image}
                  alt={role.name}
                  className="w-full h-full object-cover"
                />
                {role.popular && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                {selectedRole === role.id && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                    <h3 className="font-bold text-gray-900 mb-1">{role.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1"
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
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Don't see your role? <span className="text-blue-600 hover:text-blue-700">Request a new role track</span>
          </button>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
