import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
      <div className="layout-container flex justify-center w-full">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between w-full max-w-7xl">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            <div className="size-8 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">Career Navigator</h2>
          </div>
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-9">
              <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer" href="#how-it-works">How it Works</a>
              <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer" href="#companies">Companies</a>
              <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer" href="#pricing">Pricing</a>
              <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer" href="#about">About Us</a>
            </nav>
            <div className="flex gap-3">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm font-bold">
                <span className="truncate">Log In</span>
              </button>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white hover:bg-blue-600 transition-colors text-sm font-bold shadow-lg shadow-blue-500/20">
                <span className="truncate">Start Free</span>
              </button>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <span className="material-symbols-outlined cursor-pointer">menu</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;