import { createClient } from "@/lib/supabase/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Input } from "@/components/ui/input";
import { PendingInvitesDialog } from "./_components/pending-invites";
import { InviteUserDialog } from "./_components/invite-user";

export default async function Members(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const members = await supabase
    .from("project_member")
    .select(
      `
      id,
      user (
        id,
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

  const pendingInvites = await supabase
    .from("invite_to_project")
    .select()
    .eq("sender_project_member_id", members.data!.find(x => x.user?.id === user.data.user?.id)!.id)
    .order("created_at", {ascending: false})
  
  console.log(pendingInvites)
  
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-black my-6 tracking-tight">Members</h1>
      <div className="flex mb-4 gap-2">
      <Input placeholder="Search" className="max-w-64"/>
      <div className="flex-1" />
      <InviteUserDialog projectId={params.id} /> 
      <PendingInvitesDialog pendingInvites={pendingInvites.data!} /> 
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
