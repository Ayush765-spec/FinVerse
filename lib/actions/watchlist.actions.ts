'use server';

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/database/drizzle";
import { user, watchlist } from "@/database/schema";

// ... existing code ...

export async function getWatchlistSymbolsByEmail(email: string) {
    try {
        const userInfo = await db.select().from(user).where(eq(user.email, email)).limit(1);
        if (!userInfo.length) return [];

        const userId = userInfo[0].id;
        const items = await db.select().from(watchlist).where(eq(watchlist.userId, userId));
        return items.map(item => item.symbol);
    } catch (error) {
        console.error("Error fetching watchlist for email:", email, error);
        return [];
    }
}
import { eq, and } from "drizzle-orm";

export async function toggleWatchlist(symbol: string, company: string, isAdded: boolean) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || !session.user) {
            throw new Error("Unauthorized");
        }

        const userId = session.user.id;

        if (isAdded) {
            // Remove
            await db.delete(watchlist)
                .where(
                    // @ts-ignore
                    and(
                        eq(watchlist.userId, userId),
                        eq(watchlist.symbol, symbol)
                    )
                );
        } else {
            // Add
            await db.insert(watchlist).values({
                id: crypto.randomUUID(),
                userId,
                symbol,
                company
            });
        }

        revalidatePath("/"); // Revalidate dashboard
        return { success: true };
    } catch (error) {
        console.error("Error toggling watchlist:", error);
        return { success: false, error: "Failed to update watchlist" };
    }
}

export async function getWatchlistStatus(symbol: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || !session.user) return false;

        const userId = session.user.id;

        // @ts-ignore
        const existing = await db.select().from(watchlist).where(and(
            eq(watchlist.userId, userId),
            eq(watchlist.symbol, symbol)
        )).limit(1);

        return existing.length > 0;
    } catch (error) {
        console.error("Error checking watchlist status:", error);
        return false;
    }
}

