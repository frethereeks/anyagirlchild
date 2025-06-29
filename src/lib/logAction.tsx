"use server"
import nodemailer, { SendMailOptions } from 'nodemailer';
import prisma from './prisma';
import { config } from '@/config';
import { IDENTIFIED_ACTIONS } from '@/constants';
import Mail from 'nodemailer/lib/mailer';

interface ActionLog {
    userId?: string;
    actionType: IDENTIFIED_ACTIONS;
    message: string;
    html?: string;
    isError?: boolean;
    emailNotification?: boolean;
    receiver?: string | string[]
    attachments?: Mail.Attachment[] | undefined
}


export const sendMail = async ({ receiver, isError = false, actionType, attachments, html }: ActionLog) => {
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
            subject: `${config.APP_NAME} Notification: ${actionType}`,
            html,
            // text: `User: ${userId} ${actionType} ${table}. Details: ${message}`,
            attachments
        };
    }
    else {
        mailOptions = {
            from: config.NEXT_MAIL.FROM,
            to: config.NEXT_MAIL.RECEIVER,
            bcc: config.NEXT_MAIL.RECEIVER,
            subject: `Action Notification: ${actionType}`,
            html,
            // text: `User: ${userId} ${actionType} ${table}. Details: ${message}`,
            attachments
        };
    }
    await transporter.sendMail(mailOptions);
}


// export const logAction = async ({ userId, actionType, message, isError = false, emailNotification = false, receiver }: ActionLog) => {
export const
    logAction = async ({ userId, message, isError = false, emailNotification = false, receiver, actionType, attachments, html }: ActionLog) => {

    try {
        // Log the action to the database  
        await prisma.logger.create({
            data: { userId, message, error: isError },
        });
        // If email notification is required, send an email  
        if (emailNotification) {
            // let mailOptions: Record<any, any>;
            await sendMail({receiver, isError, actionType, attachments, html, message})
        }
    } catch (error) {
        console.error('Error logging action:', error);
    }
};