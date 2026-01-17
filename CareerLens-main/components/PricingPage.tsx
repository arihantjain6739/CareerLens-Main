import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PricingPage: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: 'Free',
            description: 'Perfect for getting started',
            monthlyPrice: 0,
            annualPrice: 0,
            features: [
                'Basic skill assessment',
                '3 AI mock interviews per month',
                'Limited interview questions',
                'Basic performance analytics',
                'Email support',
            ],
            cta: 'Get Started',
            popular: false,
        },
        {
            name: 'Pro',
            description: 'For serious job seekers',
            monthlyPrice: 199,
            annualPrice: 149,
            features: [
                'Everything in Free',
                'Unlimited AI mock interviews',
                'Full question database access',
                'Advanced analytics & insights',
                'Company-specific preparation',
                'Video response analysis',
                'Priority email support',
            ],
            cta: 'Start Pro Trial',
            popular: true,
        },
        {
            name: 'Enterprise',
            description: 'For teams & organizations',
            monthlyPrice: 499,
            annualPrice: 399,
            features: [
                'Everything in Pro',
                'Unlimited team members',
                'Custom interview scenarios',
                'API access',
                'SSO & advanced security',
                'Dedicated account manager',
                'Custom integrations',
                'SLA guarantee',
            ],
            cta: 'Contact Sales',
            popular: false,
        },
    ];

    const faqs = [
        {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
        },
        {
            question: 'Is there a free trial for Pro?',
            answer: 'Yes! We offer a 7-day free trial for the Pro plan. No credit card required to start.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for Enterprise plans.',
        },
        {
            question: 'Can I switch plans later?',
            answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="w-full px-4 md:px-10 py-20 md:py-28 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Simple, Transparent <span className="text-neutral-400">Pricing</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                        Choose the plan that fits your career goals. No hidden fees, no surprises.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-neutral-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${isAnnual ? 'bg-white' : 'bg-neutral-700'}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-200 ${isAnnual ? 'left-8 bg-black' : 'left-1 bg-neutral-400'}`}></div>
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-neutral-500'}`}>
                            Annual <span className="text-xs text-neutral-400">(Save 35%)</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="w-full px-4 md:px-10 pb-20 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative p-8 rounded-2xl border transition-all duration-200 ${plan.popular
                                        ? 'bg-white text-black border-white'
                                        : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-black' : 'text-white'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm mb-6 ${plan.popular ? 'text-neutral-600' : 'text-neutral-400'}`}>
                                    {plan.description}
                                </p>

                                <div className="mb-6">
                                    <span className={`text-5xl font-black ${plan.popular ? 'text-black' : 'text-white'}`}>
                                        ₹{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                    </span>
                                    <span className={`text-sm ${plan.popular ? 'text-neutral-600' : 'text-neutral-400'}`}>
                                        /month
                                    </span>
                                    {isAnnual && plan.annualPrice > 0 && (
                                        <div className={`text-xs mt-1 ${plan.popular ? 'text-neutral-500' : 'text-neutral-500'}`}>
                                            Billed annually (₹{plan.annualPrice * 12}/year)
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-black' : 'text-neutral-400'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className={`text-sm ${plan.popular ? 'text-neutral-700' : 'text-neutral-400'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={plan.name === 'Enterprise' ? '/contact' : '/selection'}
                                    className={`block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${plan.popular
                                            ? 'bg-black text-white hover:bg-neutral-800'
                                            : 'bg-white text-black hover:bg-neutral-200'
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-neutral-950 border-t border-neutral-800">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-neutral-900 rounded-xl border border-neutral-800 p-6"
                            >
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="font-semibold text-white">{faq.question}</span>
                                    <span className="material-symbols-outlined text-neutral-400 group-open:rotate-180 transition-transform duration-200">
                                        expand_more
                                    </span>
                                </summary>
                                <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full px-4 md:px-10 py-20 bg-black border-t border-neutral-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
                    <p className="text-neutral-400 text-lg mb-8">
                        Our team is here to help. Reach out and we'll get back to you within 24 hours.
                    </p>
                    <Link
                        to="/about"
                        className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-white text-black text-base font-semibold hover:bg-neutral-200 transition-all duration-200"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PricingPage;
