'use client';

import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="auth-layout">
            <div className="auth-left-section">
                <div className="auth-logo">
                    <div className="flex items-center gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                            <Image src="/finverse.png" alt="FinVerse logo" fill className="object-cover" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">FinVerse</h1>
                    </div>
                </div>

                {children}

            </div>

            <div className="auth-right-section relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/auth-bg.png"
                        alt="Stock Market Background"
                        fill
                        className="object-cover opacity-60 blur-[2px]"
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-center p-12">
                    <blockquote className="auth-blockquote">
                        &#34;FinVerse has completely transformed how I track my portfolio. The AI insights and real-time alerts help me make smarter investment decisions ahead of the market.&#34;
                    </blockquote>
                    <cite className="auth-testimonial-author">
                        - Alex Morgan, Date Trader
                    </cite>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
