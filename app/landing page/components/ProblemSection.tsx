'use client';

import Icon from '@/components/ui/AppIcon';

const ProblemSection = () => {
    return (
        <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="font-headline font-bold text-3xl md:text-5xl text-foreground">
                        The Game is <span className="text-error">Rigged</span> Against You
                    </h2>
                    <p className="font-body text-lg text-muted-foreground">
                        Retail traders fight with blindfolds on. Institutional algorithms eat your lunch before you even see the quote.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left: Interactive/Visual Representation of "Rigged" */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-error/20 blur-[60px] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

                        <div className="relative bg-[#0f0f11] border border-red-900/30 rounded-2xl p-8 overflow-hidden">
                            {/* decorative header */}
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-xs font-mono text-red-500">CONNECTION_UNSTABLE</div>
                            </div>

                            {/* The "Silly Box" replaced with a Glitch Data Effect */}
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex justify-between items-center opacity-40">
                                    <span className="text-red-400"> ACCESSING FEED...</span>
                                    <span>ERROR 404</span>
                                </div>
                                <div className="h-32 bg-red-500/5 rounded border border-red-500/10 flex items-center justify-center relative overflow-hidden">
                                    {/* Glitch lines */}
                                    <div className="absolute inset-0 flex flex-col justify-around opacity-20">
                                        <div className="h-[1px] w-full bg-red-500" />
                                        <div className="h-[1px] w-full bg-red-500" />
                                        <div className="h-[1px] w-full bg-red-500" />
                                    </div>

                                    <div className="text-center z-10 space-y-2">
                                        <Icon name="SignalSlashIcon" size={32} className="mx-auto text-red-500 animate-pulse" />
                                        <p className="text-red-400 font-bold tracking-widest">DATA DELAYED 15m</p>
                                    </div>
                                </div>
                                <div className="space-y-2 opacity-60">
                                    <div className="flex justify-between">
                                        <span>BID: $--.--</span>
                                        <span>ASK: $--.--</span>
                                    </div>
                                    <div className="h-1 w-full bg-red-900/20 rounded overflow-hidden">
                                        <div className="h-full w-1/3 bg-red-500/50 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Pain Points */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: 'ClockIcon',
                                title: 'Delayed Data',
                                description: 'You see the price 15 minutes late. They execute in microseconds.',
                                color: 'text-error'
                            },
                            {
                                icon: 'PuzzlePieceIcon',
                                title: 'Fragmented Tools',
                                description: 'News on Twitter, charts on TV, execution on a broker. You are too slow.',
                                color: 'text-warning'
                            },
                            {
                                icon: 'BanknotesIcon',
                                title: 'Hidden Fees',
                                description: 'Payment for Order Flow (PFOF) means you are the product, not the client.',
                                color: 'text-blue-400'
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start space-x-5 p-5 bg-surface border border-border rounded-xl hover:border-white/20 transition-all duration-300 group">
                                <div className={`p-3 rounded-lg bg-white/5 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon name={item.icon as any} size={24} />
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-lg text-foreground mb-1">{item.title}</h3>
                                    <p className="font-body font-light text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;