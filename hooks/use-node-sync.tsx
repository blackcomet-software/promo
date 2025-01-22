import { useEffect } from "react"
import { useNodes } from "@/stores/nodes";
import { createClient } from "@/lib/supabase/client";

export function useNodeSync() {
  const addNode = useNodes(state => state.addNode)
  const removeNode = useNodes(state => state.removeNode)
  const updateNode = useNodes(state => state.updateNode)
  
  return useEffect(() => {
    const supabase = createClient();

    supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes", 
      { 
        event: "INSERT", 
        schema: "public", 
        table: "node"
      }, 
      (payload) => addNode({id: payload.new.id, type: payload.new.type, position: {x: payload.new.x_coord, y: payload.new.y_coord}, data: {}}))
    .on(
      "postgres_changes", 
      { 
        event: "DELETE", 
        schema: "public", 
        table: "node"
      }, 
      (payload) => removeNode(payload.old.id))
    .on(
      "postgres_changes", 
      { 
        event: "UPDATE", 
        schema: "public", 
        table: "node"
      }, 
      (payload) => updateNode({id: payload.new.id, type: payload.new.type, position: {x: payload.new.x_coord, y: payload.new.y_coord}, data: {}}))
    .subscribe()
  }, [addNode, removeNode, updateNode])
} 
