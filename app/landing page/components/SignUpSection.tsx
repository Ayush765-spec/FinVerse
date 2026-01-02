'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const SignupSection = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        if (step < 3) {
            setStep(step + 1);
        } else {
            alert('Welcome to FinVerse! (Demo)');
        }
    };

    return (
        <section id="signup" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 order-2 md:order-1">
                        <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground">
                            Join 50,000+ Traders <br />
                            <span className="text-primary">Beating the Market</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: '30-Day Free Trial', desc: 'Full access to Pro features. Cancel anytime.' },
                                { title: 'No Hidden Fees', desc: 'Transparent pricing. You keep your profits.' },
                                { title: '24/7 Dedicated Support', desc: 'Real humans, real answers, instantly.' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start space-x-4">
                                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                                        <Icon name="CheckIcon" size={16} className="text-success" />
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-lg text-foreground">{item.title}</h4>
                                        <p className="font-body font-light text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl order-1 md:order-2">
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-headline font-bold text-2xl text-foreground">Create Account</h3>
                                <span className="text-sm text-muted-foreground">Step {step} of 3</span>
                            </div>
                            <div className="h-1 w-full bg-muted rounded overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {step === 1 && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">Must be at least 8 characters with 1 number.</p>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 animate-fade-in text-center py-6">
                                    <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon name="CheckIcon" size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold font-headline">Almost There!</h4>
                                    <p className="text-muted-foreground">Click below to start your journey.</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-body font-bold text-lg hover:bg-primary/90 transition-all duration-250"
                            >
                                {step < 3 ? 'Continue' : 'Create Journey'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupSection;