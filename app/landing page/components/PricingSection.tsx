'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted: boolean;
    buttonText: string;
}

const PricingSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const plans: PricingPlan[] = [
        {
            name: 'Starter',
            price: '0',
            period: '/mo',
            description: 'Perfect for learning and paper trading',
            features: [
                'Real-time market data (15 min delay)',
                'Basic technical indicators',
                'Paper trading account',
                'Mobile app access',
                'Community support'
            ],
            highlighted: false,
            buttonText: 'Get Started'
        },
        {
            name: 'Pro',
            price: billingCycle === 'monthly' ? '29' : '24',
            period: '/mo',
            description: 'For serious traders who need an edge',
            features: [
                'Real-time streaming data',
                'Advanced charting suite',
                'Unlimited watchlists',
                'Level 2 market data',
                'Priority support',
                'Crypto wallet integration'
            ],
            highlighted: true,
            buttonText: 'Start Free Trial'
        },
        {
            name: 'Institutional',
            price: '99',
            period: '/mo',
            description: 'Full power for professional trading',
            features: [
                'Direct market access (DMA)',
                'API access',
                'Algorithmic trading tools',
                'Dedicated account manager',
                'Custom reporting',
                'Multiple monitor support'
            ],
            highlighted: false,
            buttonText: 'Contact Sales'
        }
    ];

    if (!isHydrated) {
        return (
            <section id="pricing" className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="h-96 bg-muted/20 rounded-lg animate-pulse" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="pricing" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
                            <Icon name="CurrencyDollarIcon" size={16} className="text-accent" />
                            <span className="font-body font-normal text-sm text-accent">Transparent Pricing</span>
                        </div>

                        <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground">
                            Choose Your <span className="text-accent">Winning Edge</span>
                        </h2>

                        <p className="font-body font-light text-lg text-muted-foreground max-w-3xl mx-auto">
                            Start with a 14-day free trial on paid plans. No credit card required for Starter plan.
                        </p>

                        <div className="flex justify-center pt-4">
                            <div className="bg-card border border-border rounded-lg p-1 flex items-center space-x-2">
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`px-4 py-2 rounded-md font-body font-semibold text-sm transition-all duration-250 ${billingCycle === 'monthly'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('yearly')}
                                    className={`px-4 py-2 rounded-md font-body font-semibold text-sm transition-all duration-250 ${billingCycle === 'yearly'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Yearly <span className="text-xs font-light opacity-80">(Save 20%)</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-card border rounded-lg p-8 space-y-6 transition-all duration-250 hover:scale-105 ${plan.highlighted
                                    ? 'border-primary shadow-lg shadow-primary/10'
                                    : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full font-body font-bold text-xs uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <h3 className="font-headline font-bold text-2xl text-foreground">{plan.name}</h3>
                                    <p className="font-body font-light text-sm text-muted-foreground">{plan.description}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-baseline space-x-1">
                                        <span className="font-body font-semibold text-4xl text-foreground">${plan.price}</span>
                                        <span className="font-body font-light text-muted-foreground">{plan.period}</span>
                                    </div>
                                    {billingCycle === 'yearly' && plan.price !== '0' && (
                                        <p className="font-body font-light text-xs text-success bg-success/10 inline-block px-2 py-0.5 rounded">
                                            Billed ${parseInt(plan.price) * 12} yearly
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start space-x-3">
                                            <Icon name="CheckIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                            <span className="font-body font-light text-sm text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => router.push('/sign-in')}
                                    className={`w-full py-3 rounded-lg font-body font-semibold text-base transition-all duration-250 ${plan.highlighted
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                                        }`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
