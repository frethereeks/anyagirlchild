"use server"
import nodemailer, { SendMailOptions } from 'nodemailer';
import prisma from './prisma';
import { config } from '@/config';
// import { IDENTIFIED_ACTIONS } from '@/constants';
import Mail from 'nodemailer/lib/mailer';

interface ActionLog {
    userId?: string;
    subject: string;
    message: string;
    html?: string;
    isError?: boolean;
    emailNotification?: boolean;
    receiver?: string | string[]
    attachments?: Mail.Attachment[] | undefined
}


export const sendMail = async ({ receiver, isError = false, subject, attachments, html,  }: ActionLog) => {
    const transporter = nodemailer.createTransport({
        host: config.NEXT_MAIL.HOST,
        port: parseInt(config.NEXT_MAIL.PORT!),
        secure: true,
        auth: {
            user: config.NEXT_MAIL.USERNAME,
            pass: config.NEXT_MAIL.PASSWORD,
        },
    });
    let mailOptions: SendMailOptions;
    if (receiver) {
        mailOptions = {
            from: config.NEXT_MAIL.FROM,
            to: receiver,
            replyTo: isError ? config.NEXT_MAIL.NOREPLY : `AnyagirlChild Admin <${config.NEXT_MAIL.FROM}>`,
            bcc: config.NEXT_MAIL.RECEIVER,
            subject: `${config.APP_NAME}: ${subject}`,
            html,
            // text: `User: ${userId} ${subject} ${table}. Details: ${message}`,
            attachments
        };
    }
    else {
        mailOptions = {
            from: config.NEXT_MAIL.FROM,
            to: config.NEXT_MAIL.RECEIVER,
            bcc: config.NEXT_MAIL.RECEIVER,
            // subject: `Action Notification: ${subject}`,
            subject: `${config.APP_NAME}: ${subject}`,
            html,
            // text: `User: ${userId} ${subject} ${table}. Details: ${message}`,
            attachments
        };
    }
    await transporter.sendMail(mailOptions);
}


// export const logAction = async ({ userId, subject, message, isError = false, emailNotification = false, receiver }: ActionLog) => {
export const
    logAction = async ({ userId, message, isError = false, emailNotification = false, receiver, subject, attachments, html }: ActionLog) => {

    try {
        // Log the action to the database  
        await prisma.logger.create({
            data: { userId, message, error: isError },
        });
        // If email notification is required, send an email  
        if (emailNotification) {
            // let mailOptions: Record<any, any>;
            await sendMail({receiver, isError, subject, attachments, html, message})
        }
    } catch (error) {
        console.error('Error logging action:', error);
    }
};