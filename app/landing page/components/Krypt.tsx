'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface CryptoAsset {
    symbol: string;
    name: string;
    price: number;
    change: number;
    balance: number;
    value: number;
}

const KryptSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    // Demo state just for visualization if user doesn't connect real wallet
    const [demoAssets] = useState<CryptoAsset[]>([
        { symbol: 'BTC', name: 'Bitcoin', price: 64250.00, change: 2.15, balance: 0.15, value: 9637.50 },
        { symbol: 'ETH', name: 'Ethereum', price: 3450.80, change: -0.45, balance: 4.5, value: 15528.60 },
        { symbol: 'SOL', name: 'Solana', price: 145.20, change: 8.12, balance: 150, value: 21780.00 },
    ]);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) return null;

    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
                            <Icon name="CurrencyDollarIcon" size={16} className="text-accent" />
                            <span className="font-body font-bold text-xs text-accent uppercase tracking-wider">Web3 Integration</span>
                        </div>

                        <h2 className="font-headline font-bold text-4xl lg:text-5xl text-foreground leading-tight">
                            Seamlessly Bridge <br />
                            <span className="text-accent">Crypto & Stocks</span>
                        </h2>

                        <p className="font-body font-light text-lg text-muted-foreground leading-relaxed">
                            No more tab switching. Connect your MetaMask or Phantom wallet to view and trade your crypto assets alongside your traditional portfolio.
                        </p>

                        <div className="flex flex-col space-y-4">
                            {[
                                { title: "Non-Custodial", desc: "Your keys, your crypto. We never hold your assets." },
                                { title: "Instant Settlement", desc: "Trade and settle specifically on-chain in seconds." },
                                { title: "Unified Analytics", desc: "See your total net worth across all asset classes." }

                            ].map((item, i) => (
                                <div key={i} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/10">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Icon name="CheckIcon" size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-base text-foreground">{item.title}</h4>
                                        <p className="font-body font-light text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Visual */}
                    <div className="relative">
                        {/* Main Interface Card */}
                        <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="bg-[#0f0f11] rounded-xl p-6 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                            <AppImage src="/krypt.png" alt="MetaMask" fill className="object-cover" />
                                        </div>
                                        <span className="font-headline font-bold text-sm text-foreground">Krypt Wallet</span>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                </div>

                                {/* Balance Area */}
                                <div className="text-center py-4">
                                    <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Total Balance</p>
                                    <h3 className="text-3xl font-headline font-bold text-white">$46,946.10</h3>
                                    <div className="inline-flex items-center space-x-1 mt-2 text-success text-sm bg-success/10 px-2 py-0.5 rounded">
                                        <Icon name="ArrowTrendingUpIcon" size={14} />
                                        <span>+2.4% (24h)</span>
                                    </div>
                                </div>

                                {/* Asset List */}
                                <div className="space-y-3">
                                    {demoAssets.map((asset, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10">
                                                    <span className="text-[10px] font-bold text-white max-w-[20px] overflow-hidden">{asset.symbol[0]}</span>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-white">{asset.name}</div>
                                                    <div className="text-xs text-muted-foreground">{asset.balance} {asset.symbol}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-sm text-white">${asset.value.toLocaleString()}</div>
                                                <div className={`text-xs ${asset.change >= 0 ? 'text-success' : 'text-error'}`}>
                                                    {asset.change > 0 ? '+' : ''}{asset.change}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button className="w-full py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-bold text-sm transition-all shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                                    Connect Wallet
                                </button>
                            </div>
                        </div>

                        {/* Floating Element - Krypt Logo */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-black rounded-2xl border border-accent/20 flex items-center justify-center shadow-2xl animate-pulse-slow p-4 rotate-12 z-20">
                            <AppImage
                                src="/krypt.png"
                                alt="Krypt"
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KryptSection;