import React from 'react';

const TrustedBy: React.FC = () => {
  return (
    <section className="w-full border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">
          Trusted by candidates applying to
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">ACME Corp</span>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200 italic">GlobalTech</span>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200 font-serif">Vertex</span>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-widest">NEXUS</span>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Starlight</span>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;