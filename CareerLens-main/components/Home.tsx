import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustedBy from './TrustedBy';
import Features from './Features';
import HowItWorks from './HowItWorks';
import CTA from './CTA';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-sans bg-black">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full bg-black">
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
