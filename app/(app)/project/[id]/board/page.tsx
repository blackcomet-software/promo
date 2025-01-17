import { KanbanBoard } from "@/components/kanban-board";
import { createClient } from "@/lib/supabase/server";


export default async function ProjectBoard(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient();
  const response = await supabase.from("task").select().eq("project_id", params.id)
  const items = response.data ?? []

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl my-6 font-bold tracking-tight">Project Board</h1>
      <KanbanBoard items={items} />
    </div>
  )
}
