import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE } from "@/lib/nodemailer/templates";

// Define interface locally used in Markeetcap code
interface WelcomeEmailData {
    email: string;
    name: string;
    intro: string;
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"FinVerse" <signalist@jsmastery.pro>`, // Updated brand name
        to: email,
        subject: `Welcome to FinVerse - your stock market toolkit is ready!`, // Updated brand name
        text: 'Thanks for joining FinVerse',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"FinVerse News" <signalist@jsmastery.pro>`, // Updated brand name
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from FinVerse`, // Updated brand name
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};
