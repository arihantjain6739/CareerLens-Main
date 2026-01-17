import React from 'react';

const TrustedBy: React.FC = () => {
    return (
        <section className="w-full border-y border-neutral-800 bg-black py-10">
            <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
                <p className="text-xs font-semibold text-neutral-500 mb-8 uppercase tracking-widest">
                    Trusted by candidates applying to
                </p>
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 text-neutral-600">
                    <span className="text-xl font-bold hover:text-neutral-400 transition-colors duration-200">ACME Corp</span>
                    <span className="text-xl font-bold italic hover:text-neutral-400 transition-colors duration-200">GlobalTech</span>
                    <span className="text-xl font-bold font-serif hover:text-neutral-400 transition-colors duration-200">Vertex</span>
                    <span className="text-xl font-bold tracking-widest hover:text-neutral-400 transition-colors duration-200">NEXUS</span>
                    <span className="text-xl font-bold hover:text-neutral-400 transition-colors duration-200">Starlight</span>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;