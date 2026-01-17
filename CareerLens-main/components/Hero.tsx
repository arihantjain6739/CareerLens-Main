import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="w-full px-4 md:px-10 py-16 md:py-24 flex justify-center max-w-screen-xl mx-auto bg-black">
            <div className="max-w-7xl w-full">
                <div className="@container">
                    <div className="flex flex-col gap-10 lg:gap-16 items-center text-center">
                        {/* Content */}
                        <div className="flex flex-col gap-8 flex-1 items-center max-w-4xl">
                            <div className="flex flex-col gap-6">
                                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                                    Bridge the Gap Between Your Skills and Your <span className="text-neutral-400">Dream Job</span>
                                </h1>
                                <h2 className="text-neutral-400 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
                                    The AI-powered Career Readiness Mentor. Simulate real-world interviews, identify your skill gaps, and get a personalized roadmap to hired.
                                </h2>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link to="/selection" className="flex items-center justify-center rounded-lg h-12 px-8 bg-white text-black text-base font-semibold hover:bg-neutral-200 transition-all duration-200">
                                    Start Your Free Assessment
                                </Link>
                                <button className="flex items-center justify-center rounded-lg h-12 px-8 bg-transparent text-white border border-neutral-700 text-base font-medium hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-200">
                                    View Demo
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-neutral-500 mt-4">
                                <div className="flex -space-x-2">
                                    <div
                                        className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black bg-cover"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcxk1O8w-PpwcbI-AkbtJDPHW5ph1MmmsTWaq44l53J9vJFKQLGnO_UQ20mtNpVQcjf89jskT-DcXKhAg-ga6HeZpd4TJH3hs5Gplbk-Z3QBkRm2tVubHUsoo88w34sdS6WE4Pk_3VBAmf7eb0x3oerES1BHETNKWfEUAeuRz5QzchOvtwNjBmEYAVUa92Z-lviyPFUBAYZ1tU6ppZfGr4f9wER6PJielkny_TzvFxbePK5ktHSOmgRl5_Gi0RwsaKFGzta14mjmmD')" }}
                                    ></div>
                                    <div
                                        className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black bg-cover"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCT9RipqwapMF0uldSOuoRE8RITw8yNBgSDz33OQNAR-6nOoK0n1LQXfyN2rjbCc1ArWf5nW-04-CKQVOVuOb8Lihhl1VrpID3aEF46ok1GqjdkRg1SEeTQ1chDND3JMmlfoIC85RlZ1N2APYldSuH-6u--pZN2swmnqVwuOCgfjoXgnwWKdINrMp770f5aHdWQVyRVu7FvXZ_EuOlIrPcsYFcdvfSqlVAlz3lXBkTZ6jpLZu3nXJlEAMYtcfIhsiDwr7cg7rY-jddt')" }}
                                    ></div>
                                    <div
                                        className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black bg-cover"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmIiqVOVumHqw07dKCWF-BaSXLPLhaXYyKC626i8iTT63_2Q-0VCUMaHemHS7n1eSdrtqNBK0bPuyuvOw4PtE24xLKQLiYIvc9F7MwV9bkh1cKu63nkHrnHFb16YdKTV_sojzpgnB-aq2B7Lr61dd27HVq3Q0sGexS7tgTOIkZpxz4LLclWuZilZ9mHuX3D5b1TDj1seO01yjmlAaS4648qVd2r5bwx-HiYQ5hzZTfUHhYEb5xJdylY9i01T1xXVPJQ_24v0cHIxBf')" }}
                                    ></div>
                                </div>
                                <p>Joined by 10,000+ job seekers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;