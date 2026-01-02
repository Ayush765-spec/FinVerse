'use client';

import { useState, useEffect } from 'react';
import HeroSection from './Hero';
import ProblemSection from './ProblemSection';
import TerminalShowcase from './TerminalShowcase';
import KryptSection from './Krypt';
import FeaturesSection from './Features';
import TestimonialsSection from './Testimonials';
import PricingSection from './PricingSection';
import SecuritySection from './SecuritySection';
import FAQSection from './FAQ';
import SignupSection from './SignUpSection';
import FooterSection from './Footer';
import StickyAnchorNav from '@/components/common/StickyAnchorNav';
import TrustIndicatorBar from '@/components/common/TrustIndicatorBar';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import ConversionTracker from '@/components/common/ConversionTracker';

const LandingPageInteractive = () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const handleStartTrial = () => {
        const signupSection = document.getElementById('signup');
        if (signupSection) {
            signupSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleViewDemo = () => {
        const terminalSection = document.getElementById('terminal-showcase');
        if (terminalSection) {
            terminalSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleConversionEvent = (event: any) => {
        console.log('Conversion Event:', event);
    };

    if (!isHydrated) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="h-32 bg-muted/20 rounded-lg animate-pulse" />
                        <div className="h-64 bg-muted/20 rounded-lg animate-pulse" />
                        <div className="h-48 bg-muted/20 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <StickyAnchorNav />
            <HeroSection onStartTrial={handleStartTrial} onViewDemo={handleViewDemo} />
            <ProblemSection />
            <TerminalShowcase />
            <KryptSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <SecuritySection />
            <FAQSection />
            <SignupSection />
            <FooterSection />
            <TrustIndicatorBar />
            <ProgressIndicator />
            <ConversionTracker onEvent={handleConversionEvent} />
        </>
    );
};

export default LandingPageInteractive;