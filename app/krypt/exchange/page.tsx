"use client";

import React, { useEffect, useState } from 'react';
import { Navbar, Footer } from "@/components/krypt";
import { TransactionsProvider } from "@/components/krypt/context/TransactionContext";
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    high_24h: number;
    low_24h: number;
    price_change_percentage_24h: number;
    market_cap: number;
    circulating_supply: number;
    total_supply: number;
}

const CryptoChart = ({ coinId }: { coinId: string }) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState('1'); // 1, 7, 30, 365

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: days
                    }
                });

                const prices = response.data.prices;
                const formattedData = prices.map((item: [number, number]) => ({
                    date: new Date(item[0]).toLocaleDateString() + ' ' + new Date(item[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    price: item[1]
                }));
                setChartData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching historical data", error);
                setLoading(false);
            }
        };

        if (coinId) fetchHistory();
    }, [coinId, days]);

    if (loading) return <div className="text-white h-96 flex items-center justify-center">Loading Chart...</div>;

    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-end gap-2 mb-4">
                {['1', '7', '30', '365'].map((d) => (
                    <button
                        key={d}
                        onClick={() => setDays(d)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${days === d ? 'bg-[#2952e3] text-white font-bold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                        {d === '1' ? '24H' : d === '365' ? '1Y' : `${d}D`}
                    </button>
                ))}
            </div>
            <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2952e3" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#2952e3" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#aaa"
                            tickFormatter={(tick) => days === '1' ? tick.split(' ')[1] : tick.split(' ')[0]} // Show time for 1D, date for others
                            minTickGap={50}
                        />
                        <YAxis
                            stroke="#aaa"
                            domain={['auto', 'auto']}
                            tickFormatter={(number) => `$${number.toLocaleString()}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#2952e3' }}
                            labelStyle={{ color: '#aaa' }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#2952e3"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const ExchangePage = () => {
    const [coins, setCoins] = useState<CoinDetail[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<CoinDetail | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                // Fetch basic market data for sidebar list
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 50,
                        page: 1,
                        sparkline: false
                    }
                });
                setCoins(response.data);
                if (response.data.length > 0) setSelectedCoin(response.data[0]);
            } catch (error) {
                console.error("Error fetching coins", error);
            }
        };
        fetchCoins();
    }, []);

    const filteredCoins = coins.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <TransactionsProvider>
            <div className="min-h-screen gradient-bg-welcome">
                <Navbar />
                <div className="p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-6 min-h-[85vh]">

                    {/* Left Sidebar: Coin List */}
                    <div className="w-full lg:w-1/4 blue-glassmorphism p-4 rounded-xl flex flex-col lg:max-h-[80vh]">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent border-b border-gray-500 text-white p-2 mb-4 focus:outline-none focus:border-[#2952e3]"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="overflow-y-auto flex-1 custom-scrollbar pr-2">
                            {filteredCoins.map((coin) => (
                                <div
                                    key={coin.id}
                                    onClick={() => setSelectedCoin(coin)}
                                    className={`p-3 cursor-pointer rounded-lg mb-2 transition-all flex items-center gap-3 ${selectedCoin?.id === coin.id ? 'bg-[#2952e3] text-white shadow-lg scale-[1.02]' : 'hover:bg-white/10'}`}
                                >
                                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className={`font-semibold leading-tight ${selectedCoin?.id === coin.id ? 'text-white' : 'text-white'}`}>{coin.name}</p>
                                        <p className={`text-xs uppercase ${selectedCoin?.id === coin.id ? 'text-white/70' : 'text-gray-400'}`}>{coin.symbol}</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className={`text-sm font-mono ${selectedCoin?.id === coin.id ? 'text-white' : 'text-white'}`}>${coin.current_price.toLocaleString()}</p>
                                        <p className={`text-xs ${coin.price_change_percentage_24h >= 0 ? (selectedCoin?.id === coin.id ? 'text-green-300' : 'text-green-400') : 'text-red-400'}`}>
                                            {coin.price_change_percentage_24h.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Main: Graph and Details */}
                    <div className="w-full lg:w-3/4 flex flex-col gap-6">
                        {selectedCoin && (
                            <>
                                {/* Top Stats Bar */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="white-glassmorphism p-4 rounded-xl">
                                        <p className="text-gray-400 text-sm">Market Cap</p>
                                        <p className="text-white font-bold text-lg">${selectedCoin.market_cap.toLocaleString()}</p>
                                    </div>
                                    <div className="white-glassmorphism p-4 rounded-xl">
                                        <p className="text-gray-400 text-sm">24h High</p>
                                        <p className="text-green-400 font-bold text-lg">${selectedCoin.high_24h.toLocaleString()}</p>
                                    </div>
                                    <div className="white-glassmorphism p-4 rounded-xl">
                                        <p className="text-gray-400 text-sm">24h Low</p>
                                        <p className="text-red-400 font-bold text-lg">${selectedCoin.low_24h.toLocaleString()}</p>
                                    </div>
                                    <div className="white-glassmorphism p-4 rounded-xl">
                                        <p className="text-gray-400 text-sm">Circulating Supply</p>
                                        <p className="text-white font-bold text-lg">{selectedCoin.circulating_supply.toLocaleString()} <span className="text-xs text-gray-500 uppercase">{selectedCoin.symbol}</span></p>
                                    </div>
                                </div>

                                {/* Main Chart Section */}
                                <div className="white-glassmorphism p-6 rounded-xl flex-1 flex flex-col min-h-[500px]">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={selectedCoin.image} alt={selectedCoin.name} className="w-12 h-12" />
                                        <div>
                                            <h2 className="text-3xl text-white font-bold flex items-end gap-3">
                                                {selectedCoin.name}
                                                <span className="text-lg text-gray-500 font-normal uppercase">{selectedCoin.symbol}/USD</span>
                                            </h2>
                                            <p className="text-2xl font-mono text-white mt-1">
                                                ${selectedCoin.current_price.toLocaleString()}
                                                <span className={`ml-4 text-lg ${selectedCoin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {selectedCoin.price_change_percentage_24h >= 0 ? '+' : ''}{selectedCoin.price_change_percentage_24h.toFixed(2)}% (24h)
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-black/20 rounded-xl p-4 border border-gray-800">
                                        <CryptoChart coinId={selectedCoin.id} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </TransactionsProvider>
    );
};

export default ExchangePage;
