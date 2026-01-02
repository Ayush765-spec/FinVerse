"use client";

import React, { useEffect, useState } from 'react';
import { Navbar, Footer } from "@/components/krypt";
import { TransactionsProvider } from "@/components/krypt/context/TransactionContext";
import axios from 'axios';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface CoinData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_percentage_24h: number;
    sparkline_in_7d: {
        price: number[];
    };
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-900 border border-gray-700 p-2 rounded shadow-xl z-50">
                <p className="text-white font-bold">{data.name || ''}</p>
                <p className="text-gray-300">
                    Cap: {data.value < 1e9
                        ? `$${(data.value / 1e6).toFixed(2)}M`
                        : `$${(data.value / 1e9).toFixed(2)}B`}
                </p>
                <p className={(data.change || 0) >= 0 ? "text-green-400" : "text-red-400"}>
                    {(data.change || 0).toFixed(2)}%
                </p>
            </div>
        );
    }
    return null;
};

const CustomizedContent = (props: any) => {
    const { x, y, width, height, change, name } = props;
    const safeChange = change || 0;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: safeChange >= 0
                        ? `rgba(16, 185, 129, ${0.3 + (safeChange / 25)})` // Green scale adjusted
                        : `rgba(239, 68, 68, ${0.3 + (Math.abs(safeChange) / 25)})`, // Red scale adjusted
                    stroke: '#fff',
                    strokeWidth: 2,
                    strokeOpacity: 0.2,
                }}
            />
            {width > 40 && height > 30 && (
                <text x={x + width / 2} y={y + height / 2 - 8} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold">
                    {name}
                </text>
            )}
            {width > 40 && height > 40 && (
                <text x={x + width / 2} y={y + height / 2 + 12} textAnchor="middle" fill="#fff" fontSize={12}>
                    {safeChange.toFixed(2)}%
                </text>
            )}
        </g>
    );
};

const MarketPage = () => {
    const [coins, setCoins] = useState<CoinData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                // Fetch top 100 coins with sparkline
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 100,
                        page: 1,
                        sparkline: true,
                        price_change_percentage: '24h'
                    }
                });
                setCoins(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching CoinGecko data", error);
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );

    // Prepare data for Heatmap (Top 25 by Market Cap)
    const treeMapData = [
        {
            name: 'Cryptos',
            children: coins.slice(0, 25).map(coin => ({
                name: coin.symbol.toUpperCase(),
                size: coin.market_cap || 0,
                change: coin.price_change_percentage_24h || 0
            }))
        }
    ];

    return (
        <TransactionsProvider>
            <div className="min-h-screen gradient-bg-welcome">
                <Navbar />
                <div className="p-4 md:p-10 min-h-[80vh]">

                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h1 className="text-white text-3xl text-gradient font-bold">Crypto Market Overview</h1>
                            <p className="text-gray-400 mt-1">Real-time prices, 24h changes, and market heatmap.</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Coin..."
                            className="mt-4 md:mt-0 p-3 w-full md:w-1/3 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:border-[#2952e3] backdrop-blur-sm"
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    ) : (
                        <>
                            {/* Market Heatmap */}
                            {!filter && (
                                <div className="mb-10 w-full h-[400px] white-glassmorphism p-4 rounded-xl hidden md:block">
                                    <h2 className="text-white text-xl font-semibold mb-4 ml-2">Market Heatmap (Top 25)</h2>
                                    <ResponsiveContainer width="100%" height="90%">
                                        <Treemap
                                            data={treeMapData}
                                            dataKey="size"
                                            aspectRatio={4 / 3}
                                            stroke="#fff"
                                            fill="#8884d8"
                                            content={<CustomizedContent />}
                                        >
                                            <Tooltip content={<CustomTooltip />} />
                                        </Treemap>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* Crypto List */}
                            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-black/20 backdrop-blur-md">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-900/80 text-gray-400 text-sm border-b border-gray-800">
                                            <th className="p-4 font-medium">Rank</th>
                                            <th className="p-4 font-medium">Coin</th>
                                            <th className="p-4 font-medium">Price</th>
                                            <th className="p-4 font-medium">24h Change</th>
                                            <th className="p-4 font-medium">Market Cap</th>
                                            <th className="p-4 font-medium">Volume (24h)</th>
                                            <th className="p-4 font-medium">Last 7 Days</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCoins.map((coin) => (
                                            <tr key={coin.id} className="text-white border-b border-gray-800 hover:bg-white/5 transition-colors">
                                                <td className="p-4 text-gray-400">#{coin.market_cap_rank}</td>
                                                <td className="p-4 flex items-center gap-3">
                                                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                                                    <div>
                                                        <span className="font-bold">{coin.name}</span>
                                                        <span className="text-gray-500 text-xs ml-2 uppercase">{coin.symbol}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 font-mono">${coin.current_price.toLocaleString()}</td>
                                                <td className={`p-4 font-mono font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                                </td>
                                                <td className="p-4 text-gray-300">${coin.market_cap.toLocaleString()}</td>
                                                <td className="p-4 text-gray-300">${coin.total_volume.toLocaleString()}</td>
                                                <td className="p-4 w-32">
                                                    {/* Simple Sparkline Implementation without external heavy lib for every row */}
                                                    <div className="flex items-center h-10 w-24">
                                                        <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                                                            <polyline
                                                                fill="none"
                                                                stroke={coin.price_change_percentage_24h >= 0 ? "#10B981" : "#EF4444"}
                                                                strokeWidth="2"
                                                                points={coin.sparkline_in_7d.price.map((price, i) => {
                                                                    // Normalize to 0-30 height 0-100 width
                                                                    const min = Math.min(...coin.sparkline_in_7d.price);
                                                                    const max = Math.max(...coin.sparkline_in_7d.price);
                                                                    const x = (i / (coin.sparkline_in_7d.price.length - 1)) * 100;
                                                                    // Invert Y because SVG y=0 is top
                                                                    const y = 30 - ((price - min) / (max - min)) * 30;
                                                                    return `${x},${y}`;
                                                                }).join(' ')}
                                                            />
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </TransactionsProvider>
    );
};

export default MarketPage;
