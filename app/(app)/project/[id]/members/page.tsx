import { createClient } from "@/lib/supabase/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function Members({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const members = await supabase
    .from("project_member")
    .select(
      `
      id,
      user (
        name
      )
    `,
    )
    .eq("project_id", params.id);

  const data = members.data.map((x) => ({ name: x.user.name }));
  return (
    <div className="px-8">
      <h1 className="text-4xl font-bold my-6">Members</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
