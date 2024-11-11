import nodemailer from "nodemailer";
import { Resend } from "resend";

export const transporter = nodemailer.createTransport({
  host: "smtp.transip.email",
  port: 465,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const resend = new Resend(process.env.RESEND_API_KEY);
