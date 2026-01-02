'use client';

import Icon from '@/components/ui/AppIcon';

const FeaturesSection = () => {
    const features = [
        {
            title: "Advanced Charting",
            description: "Over 100+ technical indicators and drawing tools powered by TradingView-style clarity.",
            icon: "PresentationChartLineIcon",
            gradient: "from-blue-500/20 to-cyan-500/20"
        },
        {
            title: "News Sentiment AI",
            description: "Our AI scans global news and social media to gauge market sentiment in real-time.",
            icon: "NewspaperIcon",
            gradient: "from-purple-500/20 to-pink-500/20"
        },
        {
            title: "Global Markets",
            description: "Access US Stocks, ETFs, Forex, and Crypto in a single universal account.",
            icon: "GlobeAmericasIcon",
            gradient: "from-green-500/20 to-emerald-500/20"
        },
        {
            title: "Algorithmic Strategy",
            description: "Build and backtest trading strategies without writing a single line of code.",
            icon: "CpuChipIcon",
            gradient: "from-orange-500/20 to-red-500/20"
        },
        {
            title: "Smart Alerts",
            description: "Set custom triggers for price, volume, or RSI levels and get notified instantly.",
            icon: "BellIcon",
            gradient: "from-yellow-500/20 to-amber-500/20"
        },
        {
            title: "Community Insights",
            description: "See what the top 1% of traders on the platform are buying and selling.",
            icon: "UserGroupIcon",
            gradient: "from-indigo-500/20 to-blue-500/20"
        }
    ];

    return (
        <section id="features" className="py-24 bg-surface">
            <div className="container mx-auto px-4">
                <div className="mb-20 md:text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4 mx-auto">
                        <span className="font-body font-bold text-xs text-primary uppercase tracking-wider">Features</span>
                    </div>
                    <h2 className="font-headline font-bold text-3xl md:text-5xl text-foreground">
                        Every Tool You Need to <span className="text-primary">Dominate</span>
                    </h2>
                    <p className="font-body font-light text-lg text-muted-foreground">
                        Institutional-grade power packed into a sleek, fast interface designed for the modern trader.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="group relative p-1 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                            {/* Gradient Border on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className="relative h-full bg-[#0f0f11] border border-white/5 rounded-xl p-8 hover:bg-[#1a1a1d] transition-colors duration-300 flex flex-col">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon name={feature.icon as any} size={28} className="text-white" />
                                </div>

                                <h3 className="font-headline font-bold text-xl text-foreground mb-3">{feature.title}</h3>
                                <p className="font-body font-light text-sm text-muted-foreground leading-relaxed flex-1">
                                    {feature.description}
                                </p>

                                <div className="mt-6 flex items-center text-primary text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    <span>Learn more</span>
                                    <Icon name="ArrowRightIcon" size={12} className="ml-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;