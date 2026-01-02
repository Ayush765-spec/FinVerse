'use client';

import { useEffect, useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMarketOverview } from '@/lib/actions/ai.actions';

const AIOverview = () => {
    const [overview, setOverview] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchOverview = async () => {
        setLoading(true);
        setError(false);
        try {
            const result = await generateMarketOverview();
            if (result.success) {
                setOverview(result.overview || ''); // Handle undefined overview
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
            console.error('Failed to fetch AI overview:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOverview();
    }, []);

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-xl font-bold text-white">AI Market Overview</h2>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchOverview}
                    disabled={loading}
                    className="text-gray-400 hover:text-yellow-500"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            <div className="text-gray-300 leading-relaxed">
                {loading && (
                    <div className="flex items-center gap-2">
                        <div className="animate-pulse flex space-x-2">
                            <div className="h-4 bg-gray-700 rounded w-full"></div>
                        </div>
                        <span className="text-sm text-gray-500">Analyzing market data...</span>
                    </div>
                )}

                {error && (
                    <div className="text-red-400 bg-red-900/20 p-4 rounded">
                        Unable to generate market overview. Please try again.
                    </div>
                )}

                {!loading && !error && (
                    <div className="whitespace-pre-line text-sm">
                        {overview}
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                    Powered by AI • Updated {new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

export default AIOverview;
