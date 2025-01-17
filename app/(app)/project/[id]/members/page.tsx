import { createClient } from "@/lib/supabase/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
