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
        <section className="w-full px-4 md:px-10 py-20 md:py-28 bg-black">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-10">
                    <div className="max-w-2xl">
                        <h2 className="text-neutral-500 font-semibold tracking-widest uppercase text-xs mb-3">Features</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Roadmap to Hired</h3>
                        <p className="text-base text-neutral-400 leading-relaxed">
                            We guide you through every step of the recruitment process, providing actionable feedback to help you improve where it matters most.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-neutral-400 font-medium hover:text-white transition-colors duration-200 shrink-0 group">
                        Explore all features
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuresList.map((feature, index) => (
                        <div key={index} className="group flex flex-col gap-5 p-6 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200">
                            <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-700 group-hover:text-white transition-all duration-200">
                                <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                                <p className="text-neutral-400 text-sm leading-relaxed">
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