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

            <div className="auth-right-section">
                <blockquote className="auth-blockquote">
                    &#34;FinVerse has completely transformed how I track my portfolio. The AI insights and real-time alerts help me make smarter investment decisions ahead of the market.&#34;
                </blockquote>
                <cite className="auth-testimonial-author">
                    - Alex Morgan, Date Trader
                </cite>
                <div className="auth-dashboard-preview">
                    <Image src="/dashboard-preview.png" alt="FinVerse dashboard" width={1000} height={1000} className="rounded-xl object-contain" />
                </div>
            </div>
        </div>
    )
}
export default AuthLayout
