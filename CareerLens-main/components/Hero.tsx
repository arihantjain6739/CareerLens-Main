import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-10 py-12 md:py-20 flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="@container">
          <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Content */}
            <div className="flex flex-col gap-6 flex-1 text-center lg:text-left items-center lg:items-start">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                  Bridge the Gap Between Your Skills and Your <span className="text-primary">Dream Job</span>
                </h1>
                <h2 className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                  The AI-powered Career Readiness Mentor. Simulate real-world interviews, identify your skill gaps, and get a personalized roadmap to hired.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link to="/selection" className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30">
                  Start Your Free Assessment
                </Link>
                <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-base font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  View Demo
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <div className="flex -space-x-2">
                  <div
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-background-dark bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcxk1O8w-PpwcbI-AkbtJDPHW5ph1MmmsTWaq44l53J9vJFKQLGnO_UQ20mtNpVQcjf89jskT-DcXKhAg-ga6HeZpd4TJH3hs5Gplbk-Z3QBkRm2tVubHUsoo88w34sdS6WE4Pk_3VBAmf7eb0x3oerES1BHETNKWfEUAeuRz5QzchOvtwNjBmEYAVUa92Z-lviyPFUBAYZ1tU6ppZfGr4f9wER6PJielkny_TzvFxbePK5ktHSOmgRl5_Gi0RwsaKFGzta14mjmmD')" }}
                  ></div>
                  <div
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-background-dark bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCT9RipqwapMF0uldSOuoRE8RITw8yNBgSDz33OQNAR-6nOoK0n1LQXfyN2rjbCc1ArWf5nW-04-CKQVOVuOb8Lihhl1VrpID3aEF46ok1GqjdkRg1SEeTQ1chDND3JMmlfoIC85RlZ1N2APYldSuH-6u--pZN2swmnqVwuOCgfjoXgnwWKdINrMp770f5aHdWQVyRVu7FvXZ_EuOlIrPcsYFcdvfSqlVAlz3lXBkTZ6jpLZu3nXJlEAMYtcfIhsiDwr7cg7rY-jddt')" }}
                  ></div>
                  <div
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-background-dark bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmIiqVOVumHqw07dKCWF-BaSXLPLhaXYyKC626i8iTT63_2Q-0VCUMaHemHS7n1eSdrtqNBK0bPuyuvOw4PtE24xLKQLiYIvc9F7MwV9bkh1cKu63nkHrnHFb16YdKTV_sojzpgnB-aq2B7Lr61dd27HVq3Q0sGexS7tgTOIkZpxz4LLclWuZilZ9mHuX3D5b1TDj1seO01yjmlAaS4648qVd2r5bwx-HiYQ5hzZTfUHhYEb5xJdylY9i01T1xXVPJQ_24v0cHIxBf')" }}
                  ></div>
                </div>
                <p>Joined by 10,000+ job seekers</p>
              </div>
            </div>
            {/* Image */}
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl dark:shadow-blue-900/10">
              <div
                className="w-full aspect-video bg-cover bg-center"
                role="img"
                aria-label="Professional working on laptop in a modern bright office space"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzdmm-jLoLROLB2TCBzP2AwfosHEVC9kBcrBN3WUuPa3OjuoWR4HguoLxMRAeKD-HD2I5BiIwWKc9iC9mZpwiQbVQDL-1KfkysCglgtJWYQMpGlNojJlKfo5_zMKhW_qNJr9lIwriYd1citXmxi75UFC8k-m3KzkxIjIAjGr59fzf-k2IP2TN4PJ6nHTpzeoBqpkHgMQsTZXl8Zg3KMBHZrRn-QC52aTwPJUGHYmJv_SoKcaVVB9zkU-Ir-9cHtkHSIt6lB9dBF95I")' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;