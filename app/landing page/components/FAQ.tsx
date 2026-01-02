'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
    question: string;
    answer: string;
    category: 'platform' | 'security' | 'trading' | 'pricing';
}

const FAQSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const faqs: FAQ[] = [
        {
            question: 'Is FinVerse suitable for beginners?',
            answer: 'Absolutely! FinVerse offers a free Starter plan with paper trading, educational resources, and a supportive community. Our intuitive interface makes it easy for beginners to learn while providing advanced tools for experienced traders.',
            category: 'platform'
        },
        {
            question: 'How secure is my money and data?',
            answer: 'Your security is our topmost priority. We use 256-bit SSL encryption, multifactor authentication, and are fully SEC registered and FINRA compliant. Your investments are protected by SIPC insurance up to $500,000.',
            category: 'security'
        },
        {
            question: 'Can I trade both stocks and crypto on FinVerse?',
            answer: 'Yes! FinVerse offers seamless integration between traditional stock trading and Web3 crypto trading. Connect your MetaMask wallet to manage all your assets in one unified dashboard.',
            category: 'trading'
        },
        {
            question: 'What is the learning curve of the platform?',
            answer: 'Most users become comfortable within 1-2 days. We provide comprehensive video tutorials, live webinars, and 24/7 customer support. The interface is designed to be intuitive while offering professional-grade capabilities.',
            category: 'platform'
        },
        {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, you can cancel anytime with no penalties or hidden fees. We also offer a 30-day money-back guarantee if you are not satisfied with your Professional plan.',
            category: 'pricing'
        },
        {
            question: 'Do you offer real-time market data?',
            answer: 'Yes, we provide real-time streaming market data with zero latency. The free plan includes 15 minute delayed updates, which is perfect for learning and paper trading.',
            category: 'trading'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are processed securely with industry-standard encryption.',
            category: 'pricing'
        },
        {
            question: 'Is there a mobile app available?',
            answer: 'No, we are currently only available on desktop but you can log in with your mobile and see the same interface since the UI is adjusted for the mobile view also.',
            category: 'platform'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!isHydrated) {
        return (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-96 bg-muted/20 rounded-lg animate-pulse" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                            <Icon name="QuestionMarkCircleIcon" size={16} className="text-primary" />
                            <span className="font-body font-normal text-sm text-primary">
                                Frequently Asked Questions
                            </span>
                        </div>
                        <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground">
                            Got Questions?
                            <span className="text-primary"> We've Got Answers</span>
                        </h2>
                        <p className="font-body font-light text-lg text-muted-foreground">
                            Everything you need to know about FinVerse and getting started with professional trading.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-card border-border rounded-lg overflow-hidden transition-all duration-250 hover:border-primary">
                                <button onClick={() => toggleFAQ(index)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                                    <span className="font-body font-semibold text-base text-foreground pr-4">
                                        {faq.question}
                                    </span>
                                    <Icon
                                        name="ChevronDownIcon"
                                        size={20}
                                        className={`text-primary flex-shrink-0 transition-transform duration-250 ${openIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {openIndex === index && (
                                    <div className="px-6 pb-4 animate-fade-in">
                                        <p className="font-body font-light text-sm text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 text-center space-y-4">
                        <Icon name="ChatBubbleLeftRightIcon" size={48} className="text-primary mx-auto" />
                        <h3 className="font-headline font-bold text-2xl text-foreground">
                            Still have questions?
                        </h3>
                        <p className="font-body font-light text-base text-muted-foreground max-w-2xl mx-auto">
                            Our support team is available 24/7 to help you with any questions or concerns.
                        </p>
                        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-semibold text-base hover:bg-primary/90 transition-colors duration-250">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;