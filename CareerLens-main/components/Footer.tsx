import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black border-t border-neutral-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white">
                            <div className="size-6 text-white">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-lg font-bold">Credify</span>
                        </div>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Empowering professionals to achieve their career goals through data-driven insights.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Product</h4>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#features">Features</a>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#pricing">Pricing</a>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#enterprise">Enterprise</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Resources</h4>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#blog">Blog</a>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#guides">Interview Guides</a>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#help">Help Center</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Company</h4>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#about">About Us</a>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#careers">Careers</a>
                        <a className="text-neutral-500 hover:text-white text-sm transition-colors duration-200" href="#legal">Legal</a>
                    </div>
                </div>
                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-500 text-sm">© 2024 Credify Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a className="text-neutral-600 hover:text-white transition-colors duration-200" href="#social">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                        <a className="text-neutral-600 hover:text-white transition-colors duration-200" href="#contact">
                            <span className="material-symbols-outlined">mail</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;