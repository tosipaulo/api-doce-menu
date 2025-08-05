import nodemailer from 'nodemailer';

export const configSMTP = () => {
    return nodemailer.createTransport({
            name: process.env.MAILER_NAME,
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS,
            },
            transactionLog: true,
            logger: true,
            tls: {
            rejectUnauthorized: false,
            },
        });
    }

export const configEmail = (email: string, templateName: string) => {
    return {
        from: `Doce Menu  <${process.env.MAILER_USER}>`,
        to: email,
        subject: 'Troca de senha',
        html: templateName
    }
}