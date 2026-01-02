'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface HeroProps {
    onStartTrial?: () => void;
    onViewDemo?: () => void;
}

const HeroSection = ({ onStartTrial, onViewDemo }: HeroProps) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsHydrated(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (!isHydrated) {
        return (
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
                <div className="container mx-auto px-4 text-center">
                    Loading...
                </div>
            </section>
        );
    }

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background"
        >
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
                }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse-slow delay-700" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center space-y-8">

                    <div className="inline-flex items-center space-x-2 bg-muted/50 border border-border rounded-full px-4 py-1.5 animate-fade-in-up backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                        </span>
                        <span className="font-body font-medium text-xs text-muted-foreground uppercase tracking-wider">Live Market Data</span>
                    </div>

                    <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-foreground animate-fade-in-up delay-100">
                        Trade with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
                            Institutional Power
                        </span>
                    </h1>

                    <p className="font-body font-light text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        Unify professional stock analysis with Web3 crypto trading.
                        One secure dashboard. Zero compromise.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8 animate-fade-in-up delay-300">
                        <button
                            onClick={onStartTrial}
                            className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg font-body font-bold text-base hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-250 flex items-center justify-center space-x-2"
                        >
                            <span>Start Free Trial</span>
                            <Icon name="ArrowRightIcon" size={18} />
                        </button>

                        <button
                            onClick={onViewDemo}
                            className="w-full sm:w-auto px-8 py-3 bg-transparent border border-border text-foreground rounded-lg font-body font-semibold text-base hover:bg-muted/50 hover:border-accent/50 transition-all duration-250 flex items-center justify-center space-x-2 group"
                        >
                            <Icon name="PlayCircleIcon" size={18} className="text-accent group-hover:scale-110 transition-transform duration-250" />
                            <span>Watch Demo</span>
                        </button>
                    </div>

                    <div className="pt-16 pb-8 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 animate-fade-in-up delay-500">
                        <div className="flex items-center justify-center space-x-2 hover:text-primary transition-colors">
                            <Icon name="GlobeAltIcon" size={20} />
                            <span className="font-headline font-semibold text-sm">NASDAQ</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 hover:text-primary transition-colors">
                            <Icon name="CpuChipIcon" size={20} />
                            <span className="font-headline font-semibold text-sm">NYSE</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 hover:text-accent transition-colors">
                            <Icon name="CubeTransparentIcon" size={20} />
                            <span className="font-headline font-semibold text-sm">ETHEREUM</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 hover:text-accent transition-colors">
                            <Icon name="CurrencyDollarIcon" size={20} />
                            <span className="font-headline font-semibold text-sm">BITCOIN</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;