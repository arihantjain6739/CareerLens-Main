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
              Step 1 of 4
            </span>
          </div>
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '25%' }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-sm font-medium text-blue-600">Company Selection</span>
              <span className="text-sm text-gray-500">Skill Gap</span>
              <span className="text-sm text-gray-500">Skill Selection</span>
              <span className="text-sm text-gray-500">Mock Interview</span>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Where is your next dream role?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start by choosing the company you want to prepare for to unlock tailored insights.
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search for a company (e.g. Netflix, Spotify)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Company Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`relative p-6 bg-white rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedCompany === company.id
                      ? 'border-blue-600 shadow-lg'
                      : 'border-gray-200'
                  }`}
                >
                  {selectedCompany === company.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center p-3">
                      <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-semibold text-gray-900">{company.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Request Link */}
            <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
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
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why choose a company first?
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Selecting a target company helps us tailor your skill assessment. We analyze specific interview
                patterns, cultural fit questions, and technical bars unique to each organization.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Tailored Difficulty</h4>
                    <p className="text-sm text-gray-600">
                      We match the technical bar of the specific company.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Culture Fit</h4>
                    <p className="text-sm text-gray-600">
                      Learn values unique to organizations like Google or McKinsey.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Interview Patterns</h4>
                    <p className="text-sm text-gray-600">
                      Practice with questions recently asked by this company.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Targeting Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">
                TARGETING
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                  <img 
                    src={companies.find(c => c.id === selectedCompany)?.logo} 
                    alt={`${companies.find(c => c.id === selectedCompany)?.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-semibold text-gray-900 text-lg">
                  {companies.find(c => c.id === selectedCompany)?.name || 'Google'}
                </span>
              </div>
              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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
