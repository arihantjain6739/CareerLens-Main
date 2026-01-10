import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-10 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Career Navigator Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Three simple steps to transform your career trajectory. No credit card required to start.
          </p>
        </div>
        <div className="grid grid-cols-[60px_1fr] gap-x-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center pt-1">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined text-primary">business</span>
            </div>
            <div className="w-0.5 bg-gray-200 dark:bg-gray-700 h-full -mt-2 pb-8"></div>
          </div>
          <div className="pb-12 pt-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">1. Choose Role & Company</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2 font-medium text-sm">Define your target</p>
              <p className="text-gray-600 dark:text-gray-300">
                Select your desired job title and even specific target companies to tailor the assessment criteria.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center pt-1">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined text-primary">assignment</span>
            </div>
            <div className="w-0.5 bg-gray-200 dark:bg-gray-700 h-full -mt-2 pb-8"></div>
          </div>
          <div className="pb-12 pt-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">2. Take Assessment & Interview</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2 font-medium text-sm">~30 min session</p>
              <p className="text-gray-600 dark:text-gray-300">
                Complete a comprehensive skills quiz followed by an AI-driven video mock interview session.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center pt-1">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined text-primary">school</span>
            </div>
          </div>
          <div className="pt-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">3. Get Analysis & Study Plan</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2 font-medium text-sm">Immediate results</p>
              <p className="text-gray-600 dark:text-gray-300">
                Receive a gap analysis report and a curated list of resources to bridge those gaps effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;