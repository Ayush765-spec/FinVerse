import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/database/drizzle";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/database/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
    },
    user: {
        additionalFields: {
            country: {
                type: "string",
                required: false,
            },
            investmentGoals: {
                type: "string",
                required: false,
            },
            riskTolerance: {
                type: "string",
                required: false,
            },
            preferredIndustry: {
                type: "string",
                required: false,
            },
        }
    },
    plugins: [nextCookies()],
});
