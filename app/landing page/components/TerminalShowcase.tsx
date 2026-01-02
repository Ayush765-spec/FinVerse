'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    signal: 'BUY' | 'SELL' | 'HOLD';
    volume: string;
}

const TerminalShowcase = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [activeTab, setActiveTab] = useState<'chart' | 'heatmap'>('chart');
    const [selectedStock, setSelectedStock] = useState('AAPL');

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const chartData = [
        { time: '09:30', price: 178.50 },
        { time: '10:00', price: 179.20 },
        { time: '10:30', price: 178.80 },
        { time: '11:00', price: 180.10 },
        { time: '11:30', price: 181.50 },
        { time: '12:00', price: 180.90 },
        { time: '12:30', price: 182.30 },
        { time: '13:00', price: 183.00 }
    ];

    const volumeData = [
        { time: '09:30', volume: 2500000 },
        { time: '10:00', volume: 1800000 },
        { time: '10:30', volume: 2100000 },
        { time: '11:00', volume: 3200000 },
        { time: '11:30', volume: 2800000 },
        { time: '12:00', volume: 2300000 },
        { time: '12:30', volume: 2900000 },
        { time: '13:00', volume: 3500000 }
    ];

    const stockData: StockData[] = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 183.00, change: 2.45, signal: 'BUY', volume: '45.2M' },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.80, change: -1.23, signal: 'HOLD', volume: '89.5M' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.20, change: 5.67, signal: 'BUY', volume: '52.8M' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.50, change: 1.89, signal: 'BUY', volume: '28.3M' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 152.30, change: -0.45, signal: 'SELL', volume: '41.7M' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.80, change: 0.92, signal: 'HOLD', volume: '25.6M' }
    ];

    if (!isHydrated) {
        return (
            <section id="terminal-showcase" className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="h-96 bg-muted/20 rounded-lg animate-pulse" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="terminal-showcase" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2">
                            <Icon name="ChartBarIcon" size={16} className="text-success" />
                            <span className="font-body font-normal text-sm text-success">Professional Trading Terminal</span>
                        </div>

                        <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground">
                            Real-Time Market Intelligence at <span className="text-primary">Your Fingertips</span>
                        </h2>
                    </div>

                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                        <div className="border-b border-border p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setActiveTab('chart')}
                                    className={`px-4 py-2 rounded-lg font-body font-normal text-sm transition-colors duration-250 ${activeTab === 'chart' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Candlestick Chart
                                </button>
                                <button
                                    onClick={() => setActiveTab('heatmap')}
                                    className={`px-4 py-2 rounded-lg font-body font-normal text-sm transition-colors duration-250 ${activeTab === 'heatmap' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Stock Heatmap
                                </button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                                <span className="font-body font-light text-xs text-muted-foreground">Live Data</span>
                            </div>
                        </div>

                        {activeTab === 'chart' && (
                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-headline font-bold text-2xl text-foreground">{selectedStock}</h3>
                                        <div className="flex items-center space-x-4">
                                            <span className="font-body font-semibold text-xl text-foreground">$183.00</span>
                                            <span className="font-body font-normal text-sm text-success">+$2.45 (1.36%)</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button className="px-4 py-2 bg-success text-success-foreground rounded-lg font-body font-semibold text-sm hover:bg-success/90 transition-colors duration-250">
                                            BUY
                                        </button>
                                        <button className="px-4 py-2 bg-transparent border border-primary text-primary rounded-lg font-body font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-250 flex items-center space-x-1">
                                            <Icon name="PlusIcon" size={16} />
                                            <span>Watchlist</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="h-64" aria-label="Stock price chart">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                            <XAxis dataKey="time" stroke="#B0B0B0" style={{ fontSize: '12px' }} />
                                            <YAxis stroke="#B0B0B0" style={{ fontSize: '12px' }} domain={[177, 184]} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #00D4FF', borderRadius: '8px' }}
                                                labelStyle={{ color: '#FFFFFF' }}
                                            />
                                            <Line type="monotone" dataKey="price" stroke="#00D4FF" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="h-32" aria-label="Trading volume chart">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={volumeData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                            <XAxis dataKey="time" stroke="#B0B0B0" style={{ fontSize: '12px' }} />
                                            <YAxis stroke="#B0B0B0" style={{ fontSize: '12px' }} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #00D4FF', borderRadius: '8px' }}
                                                labelStyle={{ color: '#FFFFFF' }}
                                            />
                                            <Bar dataKey="volume" fill="#00D4FF" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {activeTab === 'heatmap' && (
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {stockData.map((stock) => (
                                        <button
                                            key={stock.symbol}
                                            onClick={() => {
                                                setSelectedStock(stock.symbol);
                                                setActiveTab('chart');
                                            }}
                                            className={`bg-surface border rounded-lg p-4 space-y-3 text-left transition-all duration-250 hover:scale-105 ${stock.signal === 'BUY' ? 'border-success hover:border-success' :
                                                    stock.signal === 'SELL' ? 'border-error hover:border-error' : 'border-warning hover:border-warning'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-headline font-bold text-lg text-foreground">{stock.symbol}</h4>
                                                    <p className="font-body font-light text-xs text-muted-foreground">{stock.name}</p>
                                                </div>
                                                <div className={`px-2 py-1 rounded text-xs font-body font-semibold ${stock.signal === 'BUY' ? 'bg-success/20 text-success' :
                                                        stock.signal === 'SELL' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                                                    }`}>
                                                    {stock.signal}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="font-body font-semibold text-xl text-foreground">${stock.price.toFixed(2)}</span>
                                                <span className={`font-body font-normal text-sm ${stock.change >= 0 ? 'text-success' : 'text-error'
                                                    }`}>
                                                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-body font-light text-muted-foreground">Volume</span>
                                                <span className="font-body font-normal text-foreground">{stock.volume}</span>
                                            </div>

                                            <button className="w-full py-2 bg-primary/10 border border-primary text-primary rounded-lg font-body font-normal text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-250 flex items-center justify-center space-x-1">
                                                <Icon name="PlusIcon" size={14} />
                                                <span>Add to Watchlist</span>
                                            </button>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TerminalShowcase;