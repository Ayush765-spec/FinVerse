'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const SecuritySection = () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const features = [
        {
            icon: 'LockClosedIcon',
            title: 'Bank-Level Encryption',
            description: 'Your data is protected by AES-256 encryption, the same standard used by major financial institutions and governments.'
        },
        {
            icon: 'ShieldCheckIcon',
            title: 'Regulatory Compliance',
            description: 'Fully compliant with SEC regulations and a registered member of FINRA and SIPC, protecting your assets up to $500k.'
        },
        {
            icon: 'KeyIcon',
            title: 'Non-Custodial Crypto',
            description: 'We never touch your private keys. Your crypto assets remain in your wallet, ensuring you have full control and ownership.'
        },
        {
            icon: 'EyeSlashIcon',
            title: 'Privacy First',
            description: 'We do not sell your data to hedge funds or third parties. Your trading strategies and positions are yours alone.'
        }
    ];

    if (!isHydrated) return null;

    return (
        <section id="security" className="py-20 bg-surface border-t border-border">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                            <Icon name="ShieldCheckIcon" size={16} className="text-primary" />
                            <span className="font-body font-normal text-sm text-primary">Uncompromising Security</span>
                        </div>
                        <h2 className="font-headline font-bold text-3xl md:text-5xl text-foreground">
                            Your Assets, <span className="text-primary">Protected</span>
                        </h2>
                        <p className="font-body font-light text-lg text-muted-foreground max-w-2xl mx-auto">
                            We build trust through transparency and state-of-the-art security protocols.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-primary/50 transition-colors duration-250 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-250">
                                    <Icon name={feature.icon as any} size={24} className="text-primary" />
                                </div>
                                <h3 className="font-headline font-bold text-lg text-foreground">{feature.title}</h3>
                                <p className="font-body font-light text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-card to-muted rounded-2xl p-8 md:p-12 border border-border flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4">
                            <h3 className="font-headline font-bold text-2xl text-foreground">Verification & Insurance</h3>
                            <div className="flex flex-wrap gap-6 text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                    <Icon name="CheckCircleIcon" size={20} className="text-success" />
                                    <span className="text-sm">2FA Enabled</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Icon name="CheckCircleIcon" size={20} className="text-success" />
                                    <span className="text-sm">Cold Storage for Crypto</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Icon name="CheckCircleIcon" size={20} className="text-success" />
                                    <span className="text-sm">$1M Insurance Policy</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <button className="px-6 py-3 bg-surface border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-semibold text-sm flex items-center space-x-2">
                                <Icon name="DocumentTextIcon" size={18} />
                                <span>View Security Whitepaper</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecuritySection;