"use server";

import { resend } from "@/lib/mailer";
import { GetInTouchEmail } from "@/components/emails/GetInTouchEmail";
import { render } from "@react-email/components";

export async function getInTouch(email: string) {
  const emailHtml = await render(<GetInTouchEmail />);

  resend.emails.send({
    from: process.env.MAIL_ADDRESS as string,
    to: process.env.MAIL_ADDRESS as string,
    subject: "Someone wants to get in touch!",
    text: `Reply to this email address: ${email}`,
  });

  resend.emails.send({
    from: process.env.MAIL_ADDRESS as string,
    to: email,
    subject: "Hey there! We’re excited to connect with you!",
    html: emailHtml,
  });

  console.log("Send onboarding emails!");
}
