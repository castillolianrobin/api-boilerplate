import nodemailer from 'nodemailer';
import { ENV } from '../../constants';

var transporter = nodemailer.createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS
  },
  from: 'admin@gmail.com',
});


export const mailer = transporter;
