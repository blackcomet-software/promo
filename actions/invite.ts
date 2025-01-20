"use server";

import { createClient } from "@/lib/supabase/server";
import { projectInvite } from "./email";
import { revalidateCurrentPath } from "./revalidateCurrentPath";
import { z } from "zod";

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})

export async function inviteUser(projectId: string, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email")
  })
                if (!validatedFields.success) return;
                const supabase = await createClient();
                const userResponse = await supabase.auth.getUser();
                const responseProjectMember = await supabase.from("project_member").select().eq("user_id", userResponse.data.user!.id).eq("project_id", projectId).single();
                const response = await supabase.from("invite_to_project").insert({sender_project_member_id: responseProjectMember.data!.id, target_email: validatedFields.data.email}).select().single();
                if (response.error) return;
                console.log("Sending the email")
                await projectInvite(validatedFields.data.email, { projectId: projectId, inviteId: response.data.id })
                revalidateCurrentPath()
            

}
