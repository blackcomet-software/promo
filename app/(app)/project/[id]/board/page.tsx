import { KanbanBoard } from "@/components/kanban-board";
import { createClient } from "@/lib/supabase/server";


export default async function ProjectBoard({ params }: { params: { id: string } }) {

  const supabase = await createClient();
  const items = await supabase.from("task").select().eq("project_id", params.id)

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl my-6 font-bold tracking-tight">Project Board</h1>
      <KanbanBoard items={items.data} />
    </div>
  )
}
