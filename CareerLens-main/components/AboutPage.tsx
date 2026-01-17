import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const AboutPage: React.FC = () => {
    const team = [
        {
            name: 'Arihant Jain',
            bio: 'Former Google engineer with 10+ years in AI/ML. Passionate about democratizing career development.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Krisha Keshab Banik',
            bio: 'Ex-Meta tech lead. Built products used by millions. Believes technology should empower everyone.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Abhiraj Deshmukh',
            bio: 'Product veteran from Amazon and Stripe. Obsessed with creating delightful user experiences.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Harshit Harlalka',
            bio: 'PhD in Machine Learning from Stanford. Pioneering the future of AI-powered career coaching.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        },
    ];

    const stats = [
        { value: '50K+', label: 'Active Users' },
        { value: '1M+', label: 'Interviews Conducted' },
        { value: '95%', label: 'Success Rate' },
        { value: '500+', label: 'Partner Companies' },
    ];

    const values = [
        {
            title: 'Innovation First',
            description: 'We push the boundaries of what\'s possible with AI to give you the best preparation experience.',
            icon: 'lightbulb',
        },
        {
            title: 'User-Centric',
            description: 'Every feature we build starts with understanding your needs and career aspirations.',
            icon: 'favorite',
        },
        {
            title: 'Transparency',
            description: 'We believe in honest feedback and clear communication. No surprises, just results.',
            icon: 'visibility',
        },
        {
            title: 'Excellence',
            description: 'We hold ourselves to the highest standards because your career deserves nothing less.',
            icon: 'star',
        },
    ];

    return (
        <div className="relative min-h-screen bg-black">
            <AnimatedBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="w-full px-4 md:px-10 py-20 md:py-28 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        About <span className="text-neutral-400">Credify</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                        We're on a mission to help professionals worldwide land their dream jobs through
                        AI-powered interview preparation and skill development.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-neutral-950 border-y border-neutral-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                                At Credify, we believe that everyone deserves access to world-class interview
                                preparation. Traditional coaching is expensive and inaccessible to most. We're
                                changing that with AI.
                            </p>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                Our platform combines cutting-edge artificial intelligence with proven interview
                                strategies to give you the confidence and skills you need to succeed. Whether
                                you're a fresh graduate or a seasoned professional, we're here to help you
                                reach your full potential.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-neutral-900 rounded-xl p-6 text-center border border-neutral-800">
                                    <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                                    <div className="text-sm text-neutral-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            These principles guide everything we do at Credify.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
                            >
                                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-white">{value.icon}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-neutral-950 border-t border-neutral-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            The passionate people behind Credify who are committed to your success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="group text-center p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                                <p className="text-sm text-neutral-400 mb-3">{member.role}</p>
                                <p className="text-xs text-neutral-500 leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-black border-t border-neutral-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Us on Our Mission</h2>
                    <p className="text-neutral-400 text-lg mb-8">
                        Ready to transform your career? Start your journey with Credify today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/selection"
                            className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-white text-black text-base font-semibold hover:bg-neutral-200 transition-all duration-200"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/how-it-works"
                            className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-transparent text-white border border-neutral-700 text-base font-medium hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-200"
                        >
                            Learn How It Works
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
