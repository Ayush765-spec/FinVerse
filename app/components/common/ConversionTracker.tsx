'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface ConversionEvent {
    type: 'view' | 'click' | 'scroll' | 'submit';
    target: string;
    value?: string | number;
    timestamp: number;
    path: string;
}

interface ConversionTrackerProps {
    onEvent?: (event: ConversionEvent) => void;
}

const ConversionTracker = ({ onEvent }: ConversionTrackerProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hasTrackedView = useRef(false);

    // Track page views
    useEffect(() => {
        if (!hasTrackedView.current) {
            trackEvent('view', 'page', pathname);
            hasTrackedView.current = true;
        }
    }, [pathname, searchParams]);

    // Track scroll depth
    useEffect(() => {
        let maxScroll = 0;
        const handleScroll = () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
            if (scrollPercent > maxScroll + 25) { // Track every 25%
                maxScroll = Math.floor(scrollPercent / 25) * 25;
                trackEvent('scroll', 'depth', maxScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track clicks on tracking elements
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trackable = target.closest('[data-track]');
            if (trackable) {
                const action = trackable.getAttribute('data-track');
                const value = trackable.getAttribute('data-track-value');
                if (action) {
                    trackEvent('click', action, value || undefined);
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const trackEvent = (type: ConversionEvent['type'], target: string, value?: string | number) => {
        const event: ConversionEvent = {
            type,
            target,
            value,
            timestamp: Date.now(),
            path: pathname
        };

        // Console log for dev, potentially send to analytics API
        if (process.env.NODE_ENV === 'development') {
            // console.log('Tracked Event:', event);
        }

        if (onEvent) {
            onEvent(event);
        }

        // Ideally here we would push to GTM or similar
        // if (typeof window.gtag === 'function') { ... }
    };

    return null; // This component renders nothing visual
};

export default ConversionTracker;