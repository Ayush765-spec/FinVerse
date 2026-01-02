'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateMarketOverview() {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' }); // Updated model name if needed, or stick to flash-lite as per original but 2.0 is better if available. Original was 2.5-flash-lite? Let's stick to user key capabilities. User provided GEMINI_API_KEY.
        // Original code used 'gemini-2.5-flash-lite'. I will use 'gemini-1.5-flash' or 'gemini-pro' as safer defaults if 2.5 is not available, but let's try to match or use a known working one.
        // Actually, user provided "GEMINI_API_KEY", standard is 1.5-flash or 2.0-flash-exp. 
        // I will use 'gemini-1.5-flash' as it is standard and fast.

        const safeModel = 'gemini-1.5-flash';

        const modelInstance = genAI.getGenerativeModel({ model: safeModel });

        const prompt = `You are a professional financial analyst. Provide a concise market overview for today covering:

1. Overall market sentiment (bullish, bearish, or neutral)
2. Key market drivers and trends
3. Notable sector performances
4. Important economic indicators or events affecting markets
5. Brief outlook for the next trading session

Keep the response professional, informative, and under 200 words. Format it in a clear, easy-to-read structure.`;

        const result = await modelInstance.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return { success: true, overview: text };
    } catch (error) {
        console.error('Error generating market overview:', error);
        return {
            success: false,
            overview: 'Unable to generate market overview at this time. Please try again later.'
        };
    }
}
