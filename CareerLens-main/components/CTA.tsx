import React from 'react';

const CTA: React.FC = () => {
    return (
        <section className="w-full px-4 md:px-10 py-20 bg-neutral-950 border-t border-neutral-800">
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Ready to land your dream job?
                </h2>
                <p className="text-lg text-neutral-400">
                    Stop guessing what employers want. Get the insights you need to succeed today.
                </p>
                <button className="flex items-center justify-center rounded-lg h-14 px-8 bg-white text-black text-lg font-semibold hover:bg-neutral-200 transition-all duration-200 w-full sm:w-auto">
                    Start Your Free Assessment
                </button>
                <p className="text-sm text-neutral-500">No credit card required. Free for individuals.</p>
            </div>
        </section>
    );
};

export default CTA;