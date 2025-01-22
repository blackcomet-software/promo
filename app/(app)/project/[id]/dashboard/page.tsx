import "@xyflow/react/dist/style.css";
import { GraphEditor } from "./_components/graph-editor";
import { createClient } from "@/lib/supabase/server";

const initialEdges = [{ id: "test", source: "038b8397-c0d2-4145-af1a-08b3b2549669", target: "1b2799fc-8033-48ca-8a2a-b4c2fc4a84bf", type: "straight" }];

export default async function Dashboard() {
  const supabase = await createClient();
  const response = await supabase.from("node").select()
  const initialNodes = response.data!.map(node => ({id: node.id, type: node.type, position: {x: node.x_coord ?? 0, y: node.y_coord ?? 0}, data: {}}))
  return <GraphEditor initialNodes={initialNodes} initialEdges={initialEdges} /> 
}
