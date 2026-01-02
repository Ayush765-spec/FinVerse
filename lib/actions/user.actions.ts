'use server';

import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { isNotNull } from "drizzle-orm";

export const getAllUsersForNewsEmail = async () => {
    try {
        const users = await db.select({
            id: user.id,
            email: user.email,
            name: user.name,
            country: user.country
        })
            .from(user)
            .where(isNotNull(user.email));

        return users.filter((u) => u.email && u.name).map((u) => ({
            id: u.id,
            email: u.email,
            name: u.name,
            country: u.country || undefined
        }))
    } catch (e) {
        console.error('Error fetching users for news email:', e)
        return []
    }
}
