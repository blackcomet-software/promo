"use server";

import { transporter } from "@/lib/mailer";
import { GetInTouchEmail } from "@/components/emails/GetInTouchEmail";
import { render } from "@react-email/render";

export async function getInTouch(email: string) {
  // Mutate data
  console.log(email);
  const result = await transporter.sendMail({
    from: process.env.MAIL_ADDRESS,
    to: "nordinvandijk@icloud.com",
    subject: "Someone wants to get in touch!",
    text: `Reply to this ${email} `,
  });

  const emailHtml = await render(<GetInTouchEmail />);

  const result2 = await transporter.sendMail({
    from: process.env.MAIL_ADDRESS,
    to: email,
    subject: "Hey there! We’re excited to connect with you!",
    html: emailHtml,
  });

  console.log(result.response);
  console.log(result2.response);
}
