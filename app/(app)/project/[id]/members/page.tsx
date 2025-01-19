import { createClient } from "@/lib/supabase/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { projectInvite } from "@/actions/email";
import { z } from "zod";

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})

export default async function Members(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient();
  const members = await supabase
    .from("project_member")
    .select(
      `
      id,
      user (
        name 
      ), 
      project_member_roles(
        project_role ( 
          title
        )
      )
      
    `,
    )
    .eq("project_id", params.id);

  
  const data = !members.data ? [] : members.data.map((x) => ({ name: x.user?.name ?? "", roles: x.project_member_roles.map(x => x.project_role.title) }));

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-6 tracking-tight">Members</h1>
      <div className="flex mb-4">
      <Input placeholder="Search" className="max-w-64"/>
      <div className="flex-1" />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Invite a user</Button>
        </DialogTrigger>
        <DialogContent>
            <form action={ async (formData: FormData) => {
                "use server";
                const validatedFields = schema.safeParse({
                  email: formData.get("email")
                })
                if (!validatedFields.success) return;
                const supabase = await createClient();
                const userResponse = await supabase.auth.getUser();
                const responseProjectMember = await supabase.from("project_member").select().eq("user_id", userResponse.data.user!.id).eq("project_id", params.id).single();
                const response = await supabase.from("invite_to_project").insert({sender_project_member_id: responseProjectMember.data!.id, target_email: validatedFields.data.email}).select().single();
                if (response.error) return;
                console.log("Sending the email")
                await projectInvite(validatedFields.data.email, { projectId: params.id, inviteId: response.data.id })
            }}>
          <DialogHeader>
            <DialogTitle>Invite a member to the project</DialogTitle>
            <DialogDescription>Please fill in the email adress of the user you want to invite to collaborate on this project with</DialogDescription>
          </DialogHeader>
          <Input placeholder="Email" name="email" />
          <DialogFooter>
            
              <Button>Invite</Button>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>

          </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
