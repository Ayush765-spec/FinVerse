'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Alex R.",
            role: "Day Trader",
            image: "A",
            quote: "FinVerse changed my entire workflow. The speed of execution combined with the heatmap visualization gives me an insane edge.",
            rating: 5
        },
        {
            name: "Sarah Chen",
            role: "Crypto Investor",
            image: "S",
            quote: "Finally, a platform that doesn't treat crypto as an afterthought. Managing my ETH positions alongside my tech stocks is seamless.",
            rating: 5
        },
        {
            name: "Marcus J.",
            role: "Portfolio Manager",
            image: "M",
            quote: "I used to pay $2k/month for a terminal that did less than this. The institutional grade data for this price point is unheard of.",
            rating: 5
        }
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-headline font-bold text-3xl md:text-5xl text-foreground">
                        Trusted by <span className="text-primary">Winners</span>
                    </h2>
                    <p className="font-body font-light text-lg text-muted-foreground">
                        Join the community of traders who are outperforming the market.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-surface border border-border rounded-xl p-8 space-y-6 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center space-x-1">
                                {[...Array(t.rating)].map((_, r) => (
                                    <Icon key={r} name="StarIcon" variant="solid" size={20} className="text-warning" />
                                ))}
                            </div>
                            <p className="font-body font-light text-foreground text-lg italic leading-relaxed">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center space-x-4 pt-4 border-t border-border">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary font-headline">
                                    {t.image}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground">{t.name}</div>
                                    <div className="text-xs text-muted-foreground">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;