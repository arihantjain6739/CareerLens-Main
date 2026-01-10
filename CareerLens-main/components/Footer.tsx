import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <div className="size-6 text-primary">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-lg font-bold">Career Navigator</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Empowering professionals to achieve their career goals through data-driven insights.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Product</h4>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#features">Features</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#pricing">Pricing</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#enterprise">Enterprise</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Resources</h4>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#blog">Blog</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#guides">Interview Guides</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#help">Help Center</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Company</h4>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#about">About Us</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#careers">Careers</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm transition-colors" href="#legal">Legal</a>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 Career Navigator Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="text-gray-400 hover:text-primary transition-colors" href="#social">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a className="text-gray-400 hover:text-primary transition-colors" href="#contact">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;