"use client";

import React from 'react';
import { Navbar, Footer } from "@/components/krypt";
import { TransactionsProvider } from "@/components/krypt/context/TransactionContext";
import Link from 'next/link';

const TutorialsPage = () => {
    return (
        <TransactionsProvider>
            <div className="min-h-screen gradient-bg-welcome">
                <Navbar />
                <div className="p-10 min-h-[80vh] max-w-7xl mx-auto">
                    <h1 className="text-white text-4xl mb-10 text-gradient font-bold text-center">Crypto Tutorials & Resources</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Featured Video */}
                        <div className="flex flex-col">
                            <h2 className="text-white text-2xl mb-4 font-semibold border-l-4 border-blue-500 pl-4">Featured Guide</h2>
                            <div className="white-glassmorphism p-2 rounded-xl h-full">
                                <div className="w-full aspect-video rounded-lg overflow-hidden relative">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/RwuG9HluFQY"
                                        title="Crypto Tutorial"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white text-xl font-bold">Comprehensive Crypto Guide</h3>
                                    <p className="text-gray-300 mt-2">Learn the fundamentals of cryptocurrency, blockchain, and how to get started safely in the Web3 ecosystem.</p>
                                </div>
                            </div>
                        </div>

                        {/* YouTube Channel Resource */}
                        <div className="flex flex-col">
                            <h2 className="text-white text-2xl mb-4 font-semibold border-l-4 border-blue-400 pl-4">Recommended Channel</h2>
                            <a
                                href="https://www.youtube.com/channel/UCGL9ubdGcvZh_dvSV2z1hoQ"
                                target="_blank"
                                rel="noreferrer"
                                className="white-glassmorphism p-6 rounded-xl h-full flex flex-col items-center justify-center hover:bg-white/5 transition-all group"
                            >
                                <div className="w-24 h-24 rounded-full bg-[#2952e3] flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                </div>
                                <h3 className="text-white text-2xl font-bold text-center">Visit Our Channel</h3>
                                <p className="text-gray-300 mt-2 text-center">Find more in-depth analyses, market updates, and expert tutorials.</p>
                                <button className="mt-6 px-6 py-2 bg-[#2952e3] text-white rounded-full font-semibold group-hover:bg-[#2546bd] transition-colors">
                                    Watch on YouTube
                                </button>
                            </a>
                        </div>

                    </div>

                    <div className="mt-16 text-center">
                        <Link href="https://www.youtube.com" target="_blank" className="text-blue-400 hover:text-blue-300 underline text-lg">
                            Refer to YouTube for more tutorials
                        </Link>
                    </div>

                </div>
                <Footer />
            </div>
        </TransactionsProvider>
    );
};

export default TutorialsPage;
