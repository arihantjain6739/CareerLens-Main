import React from 'react';

const HowItWorks: React.FC = () => {
    return (
        <section className="w-full px-4 md:px-10 py-20 md:py-28 bg-black">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">How Career Navigator Works</h2>
                    <p className="text-neutral-400 max-w-xl mx-auto">
                        Three simple steps to transform your career trajectory. No credit card required to start.
                    </p>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-x-6">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center pt-1">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center z-10">
                            <span className="material-symbols-outlined text-neutral-400">business</span>
                        </div>
                        <div className="w-px bg-neutral-800 h-full -mt-2 pb-8"></div>
                    </div>
                    <div className="pb-12 pt-2">
                        <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors duration-200">
                            <h3 className="text-lg font-semibold text-white mb-1">1. Choose Role & Company</h3>
                            <p className="text-neutral-500 mb-2 font-medium text-sm">Define your target</p>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Select your desired job title and even specific target companies to tailor the assessment criteria.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center pt-1">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center z-10">
                            <span className="material-symbols-outlined text-neutral-400">assignment</span>
                        </div>
                        <div className="w-px bg-neutral-800 h-full -mt-2 pb-8"></div>
                    </div>
                    <div className="pb-12 pt-2">
                        <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors duration-200">
                            <h3 className="text-lg font-semibold text-white mb-1">2. Take Assessment & Interview</h3>
                            <p className="text-neutral-500 mb-2 font-medium text-sm">~30 min session</p>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Complete a comprehensive skills quiz followed by an AI-driven video mock interview session.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center pt-1">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center z-10">
                            <span className="material-symbols-outlined text-neutral-400">school</span>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors duration-200">
                            <h3 className="text-lg font-semibold text-white mb-1">3. Get Analysis & Study Plan</h3>
                            <p className="text-neutral-500 mb-2 font-medium text-sm">Immediate results</p>
                            <p className="text-neutral-400 text-sm leading-relaxed">
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