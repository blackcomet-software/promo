"use server";

import { transporter } from "@/lib/mailer";

export async function getInTouch(email: string) {
  // Mutate data
  console.log(email);
  const result = await transporter.sendMail({
    from: process.env.MAIL_ADDRESS,
    to: "nordinvandijk@icloud.com",
    subject: "Someone wants to get in touch!",
    text: `Reply to this ${email} `,
  });

  console.log(result.response);
}
