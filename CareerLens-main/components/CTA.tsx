import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-10 py-20 bg-primary/5 dark:bg-primary/10 border-t border-primary/10">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
          Ready to land your dream job?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Stop guessing what employers want. Get the insights you need to succeed today.
        </p>
        <button className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 w-full sm:w-auto">
          Start Your Free Assessment
        </button>
        <p className="text-sm text-gray-500">No credit card required. Free for individuals.</p>
      </div>
    </section>
  );
};

export default CTA;