import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/95 backdrop-blur-md">
            <div className="layout-container flex justify-center w-full">
                <div className="px-4 md:px-10 py-4 flex items-center justify-between w-full max-w-7xl">
                    <Link to="/" className="flex items-center gap-3 text-white">
                        <div className="size-8 text-white">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">Credify</h2>
                    </Link>
                    <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
                        <nav className="flex items-center gap-9">
                            <Link className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200" to="/how-it-works">How it Works</Link>
                            <Link className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200" to="/selection">Companies</Link>
                            <Link className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200" to="/pricing">Pricing</Link>
                            <Link className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200" to="/about">About Us</Link>
                        </nav>
                        <div className="flex gap-3 items-center">
                            <Link to="/profile" className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200" title="Profile">
                                <span className="material-symbols-outlined text-xl">person</span>
                            </Link>
                            <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-transparent border border-neutral-700 text-white hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-200 text-sm font-medium">
                                <span className="truncate">Log In</span>
                            </Link>
                            <Link to="/selection" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-white text-black hover:bg-neutral-200 transition-all duration-200 text-sm font-semibold">
                                <span className="truncate">Start Free</span>
                            </Link>
                        </div>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <span className="material-symbols-outlined cursor-pointer text-white">menu</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;