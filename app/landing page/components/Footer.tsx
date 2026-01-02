'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const FooterSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        setIsHydrated(true);
        setCurrentYear(new Date()?.getFullYear()?.toString());
    }, []);

    const footerLinks = {
        product: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Security', href: '#security' },
            { label: 'Mobile App', href: '#' }
        ],
        company: [
            { label: 'About Us', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Press Kit', href: '#' },
            { label: 'Contact', href: '#' }
        ],
        resources: [
            { label: 'Help Center', href: '#' },
            { label: 'Trading Guide', href: '#' },
            { label: 'API Docs', href: '#' },
            { label: 'Community', href: '#' }
        ],
        legal: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Risk Disclosure', href: '#' },
            { label: 'Compliance', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: 'twitter', label: 'Twitter', href: '#' },
        { icon: 'linkedin', label: 'LinkedIn', href: '#' },
        { icon: 'facebook', label: 'Facebook', href: '#' },
        { icon: 'youtube', label: 'YouTube', href: '#' }
    ];

    if (!isHydrated) {
        return (
            <footer className="bg-surface border-t border-border py-12">
                <div className="container mx-auto px-4">
                    <div className="h-64 bg-muted/20 rounded-lg animate-pulse" />
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-surface border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <Link href="/landing-page" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-primary-foreground font-headline font-bold text-xl">F</span>
                                </div>
                                <span className="font-headline font-bold text-2xl text-foreground">FinVerse</span>
                            </Link>
                            <p className="font-body font-light text-sm text-muted-foreground max-w-xs">
                                Empowering retail investors with institutional-grade trading tools and seamless Web3 integration.
                            </p>
                            <div className="flex items-center space-x-3">
                                {socialLinks?.map((social) => (
                                    <a
                                        key={social?.icon}
                                        href={social?.href}
                                        className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary transition-colors duration-250"
                                        aria-label={social?.label}
                                    >
                                        <Icon name="ShareIcon" size={18} className="text-muted-foreground" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-headline font-bold text-sm text-foreground">Product</h4>
                            <ul className="space-y-2">
                                {footerLinks?.product?.map((link) => (
                                    <li key={link?.label}>
                                        <a
                                            href={link?.href}
                                            className="font-body font-light text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                                        >
                                            {link?.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-headline font-bold text-sm text-foreground">Company</h4>
                            <ul className="space-y-2">
                                {footerLinks?.company?.map((link) => (
                                    <li key={link?.label}>
                                        <a
                                            href={link?.href}
                                            className="font-body font-light text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                                        >
                                            {link?.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-headline font-bold text-sm text-foreground">Resources</h4>
                            <ul className="space-y-2">
                                {footerLinks?.resources?.map((link) => (
                                    <li key={link?.label}>
                                        <a
                                            href={link?.href}
                                            className="font-body font-light text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                                        >
                                            {link?.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-headline font-bold text-sm text-foreground">Legal</h4>
                            <ul className="space-y-2">
                                {footerLinks?.legal?.map((link) => (
                                    <li key={link?.label}>
                                        <a
                                            href={link?.href}
                                            className="font-body font-light text-sm text-muted-foreground hover:text-primary transition-colors duration-250"
                                        >
                                            {link?.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-border pt-8 space-y-6">
                        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6">
                            <div className="flex items-start space-x-3">
                                <Icon name="ExclamationTriangleIcon" size={24} className="text-warning flex-shrink-0 mt-1" />
                                <div className="space-y-2">
                                    <h5 className="font-headline font-bold text-sm text-foreground">Risk Disclosure</h5>
                                    <p className="font-body font-light text-xs text-muted-foreground leading-relaxed">
                                        Trading stocks, options, and cryptocurrencies involves substantial risk and is not suitable for all investors. Past performance does not guarantee future results. You may lose some or all of your invested capital. Before trading, carefully consider your investment objectives, experience level, and risk tolerance. FinVerse is registered with the SEC and is a member of FINRA and SIPC. Securities products are not FDIC insured, not bank guaranteed, and may lose value.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            <p className="font-body font-light text-xs text-muted-foreground">
                                © {currentYear} FinVerse Technologies Inc. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Icon name="ShieldCheckIcon" size={16} className="text-success" />
                                    <span className="font-body font-light text-xs text-muted-foreground">SEC Registered</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Icon name="BuildingLibraryIcon" size={16} className="text-success" />
                                    <span className="font-body font-light text-xs text-muted-foreground">FINRA Member</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Icon name="ShieldExclamationIcon" size={16} className="text-success" />
                                    <span className="font-body font-light text-xs text-muted-foreground">SIPC Protected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;