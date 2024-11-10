import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.transip.email",
  port: 465,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});
