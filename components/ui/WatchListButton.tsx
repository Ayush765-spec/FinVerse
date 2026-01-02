'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { toggleWatchlist, getWatchlistStatus } from '@/lib/actions/watchlist.actions';
import { cn } from '@/lib/utils';
import { authClient } from "../../lib/better-auth/client";

interface WatchListButtonProps {
    symbol: string;
    companyName: string;
    className?: string;
}

const WatchListButton = ({ symbol, companyName, className }: WatchListButtonProps) => {
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // @ts-ignore
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const checkStatus = async () => {
            if (session?.user) {
                const status = await getWatchlistStatus(symbol);
                setIsWatchlisted(status);
            }
            setIsLoading(false);
        };

        checkStatus();
    }, [symbol, session]);

    const handleToggle = async () => {
        if (!session) {
            toast.error("Please sign in to add to watchlist");
            return;
        }

        setIsLoading(true);
        // Optimistic update
        const previousState = isWatchlisted;
        setIsWatchlisted(!isWatchlisted);

        try {
            const result = await toggleWatchlist(symbol, companyName, previousState);

            if (!result.success) {
                // Revert on failure
                setIsWatchlisted(previousState);
                toast.error("Failed to update watchlist");
            } else {
                toast.success(previousState ? "Removed from watchlist" : "Added to watchlist");
            }
        } catch (error) {
            setIsWatchlisted(previousState);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            disabled={isLoading}
            className={cn("hover:bg-transparent p-0 h-auto w-auto", className)}
            title={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
        >
            <Star
                className={cn(
                    "h-6 w-6 transition-all duration-300",
                    isWatchlisted
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-400 hover:text-yellow-500"
                )}
            />
        </Button>
    );
};

export default WatchListButton;
