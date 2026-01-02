'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface NavItem {
    label: string;
    anchor: string;
    icon: string;
    tooltip: string;
}

interface StickyAnchorNavProps {
    isCollapsed?: boolean;
}

const StickyAnchorNav = ({ isCollapsed = false }: StickyAnchorNavProps) => {
    // Always visible or based on scroll if preferred, but user requested visible at all times
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems: NavItem[] = [
        {
            label: 'Platform Demo',
            anchor: '#terminal-showcase',
            icon: 'ChartBarIcon',
            tooltip: 'See live trading tools'
        },
        {
            label: 'Features',
            anchor: '#features',
            icon: 'SparklesIcon',
            tooltip: 'Explore capabilities'
        },
        {
            label: 'Pricing',
            anchor: '#pricing',
            icon: 'CurrencyDollarIcon',
            tooltip: 'View plans'
        },
        {
            label: 'Security',
            anchor: '#security',
            icon: 'ShieldCheckIcon',
            tooltip: 'Trust & compliance'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navItems.map(item => item.anchor.substring(1));
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(`#${currentSection}`);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (anchor: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(anchor);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${scrolled
                    ? 'bg-background/80 backdrop-blur-md border-border py-2 shadow-lg'
                    : 'bg-transparent border-transparent py-4'
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Link href="/landing-page" className="flex items-center space-x-3 group">
                            <div className="relative w-12 h-12 overflow-hidden">
                                <AppImage
                                    src="/finverse.png"
                                    alt="FinVerse Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-headline font-bold text-xl text-foreground group-hover:text-primary transition-colors">FinVerse</span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.anchor}
                                    onClick={() => handleNavClick(item.anchor)}
                                    className={`group relative px-4 py-2 rounded-lg transition-all duration-250 border border-transparent ${activeSection === item.anchor
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                        }`}
                                    title={item.tooltip}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Icon name={item.icon as any} size={18} />
                                        <span className="font-body font-normal text-sm">{item.label}</span>
                                    </div>
                                </button>
                            ))}
                            <div className="pl-4 border-l border-border ml-2">
                                <button className="px-5 py-2 bg-accent text-accent-foreground rounded-lg font-bold text-sm hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all duration-300">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors duration-250"
                            aria-label="Toggle menu"
                        >
                            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[90] md:hidden">
                    <div
                        className="absolute inset-0 bg-background/95 backdrop-blur-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-20 left-4 right-4 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex flex-col p-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.anchor}
                                    onClick={() => handleNavClick(item.anchor)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-250 ${activeSection === item.anchor
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                        }`}
                                >
                                    <Icon name={item.icon as any} size={20} />
                                    <div className="flex-1 text-left">
                                        <div className="font-body font-normal text-base">{item.label}</div>
                                    </div>
                                </button>
                            ))}
                            <button className="mt-2 w-full py-3 bg-accent text-accent-foreground rounded-lg font-bold">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StickyAnchorNav;