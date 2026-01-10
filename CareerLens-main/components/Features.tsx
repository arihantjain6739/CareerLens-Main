import React from 'react';

const Features: React.FC = () => {
  const featuresList = [
    {
      icon: "work",
      title: "Select Your Path",
      description: "Choose from 50+ industry roles and target companies to simulate the exact hiring bar you need to clear."
    },
    {
      icon: "pie_chart",
      title: "Skill Gap Analysis",
      description: "Get a detailed report on what you're missing versus what the market demands for your dream role."
    },
    {
      icon: "mic",
      title: "Mock Interviews",
      description: "Practice with AI that acts like a real hiring manager, adapting questions based on your responses."
    }
  ];

  return (
    <section className="w-full px-4 md:px-10 py-16 md:py-24 bg-white dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Roadmap to Hired</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We guide you through every step of the recruitment process, providing actionable feedback to help you improve where it matters most.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:underline shrink-0 group">
            Explore all features
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresList.map((feature, index) => (
            <div key={index} className="group flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-800/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;