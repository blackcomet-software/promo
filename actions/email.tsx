"use server";

import { resend } from "@/lib/mailer";
import { GetInTouchEmail } from "@/components/emails/GetInTouchEmail";
import { render } from "@react-email/components";
import { ProjectInvite } from "@/components/emails/ProjectInvite";
import { createClient } from "@/lib/supabase/server";

export async function getInTouch(email: string) {
  const emailHtml = await render(<GetInTouchEmail />);

  const sendMailToSelf = resend.emails.send({
    from: process.env.MAIL_ADDRESS as string,
    to: process.env.MAIL_ADDRESS as string,
    subject: "Someone wants to get in touch!",
    text: `Reply to this email address: ${email}`,
  });

  const sendMailToUser = resend.emails.send({
    from: process.env.MAIL_ADDRESS as string,
    to: email,
    subject: "Hey there! We’re excited to connect with you!",
    html: emailHtml,
  });

  const result = await Promise.allSettled([sendMailToSelf, sendMailToUser]);

  if (result.filter((x) => x.status == "fulfilled").length == 2) {
    console.log("Onboarding emails send succesfully");
    return;
  }

  console.error("Something went wrong while sending the onboarding emails");
}


export async function projectInvite(email: string, data: {projectId: string, inviteId: string}) {
  const supabase = await createClient();
  const response = await supabase.from("project").select().eq("id", data.projectId).single()
  if (response.data?.name == null) return;
  const projectName = response.data.name

  const emailHtml = await render(<ProjectInvite projectName={projectName} inviteId={data.inviteId} />);

  await resend.emails.send({
    from: process.env.MAIL_ADDRESS as string,
    to: email,
    subject: "You are invited to a project",
    html: emailHtml,
  }); 
}
