'use client';

import { useState, useEffect } from 'react';

const ProgressIndicator = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScrollProgress(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (scrollProgress === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-transparent">
            <div
                className="h-full bg-primary transition-all duration-100 ease-out shadow-neon-blue"
                style={{ width: `${scrollProgress * 100}%` }}
            />
        </div>
    );
};

export default ProgressIndicator;