import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustedBy from './TrustedBy';
import Features from './Features';
import HowItWorks from './HowItWorks';
import CTA from './CTA';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const Home: React.FC = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-sans bg-black">
            <AnimatedBackground />
            <Navbar />
            <main className="relative z-10 flex-1 flex flex-col items-center w-full">
                <Hero />
                <TrustedBy />
                <Features />
                <HowItWorks />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;

