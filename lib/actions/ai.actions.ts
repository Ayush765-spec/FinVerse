'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateMarketOverview() {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

        const prompt = `You are a professional financial analyst. Provide a concise market overview for today covering:

1. Overall market sentiment (bullish, bearish, or neutral)
2. Key market drivers and trends
3. Notable sector performances
4. Important economic indicators or events affecting markets
5. Brief outlook for the next trading session

Keep the response professional, informative, and under 200 words. Format it in a clear, easy-to-read structure.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        // Text method might return markdown, so we will handle that in the UI component
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
