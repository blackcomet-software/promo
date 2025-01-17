"use client";

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { KanbanColumn } from "./kanban-column";
import { Task } from "./task";
import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";

export function KanbanBoard(props: {items: {id: string, title: string, status: string}[] }) {
  const [data, setData] = useState([
    {status: "todo", title: "Todo", items: props.items.filter(x => x.status == "todo")}, 
    {status: "in_progress", title: "In Progress", items: props.items.filter(x => x.status == "in_progress")}, 
    {status: "done", title: "Done", items: props.items.filter(x => x.status == "done")}
  ])
  
  const [startTask, setStartTask] = useState<Task | undefined>(undefined)
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined)
  
  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      console.log(`Changing status of task ${startTask?.id} from ${startTask?.status} to ${activeTask?.status}`)
      const supabase = createClient();
      const response = await supabase.from("task").update({ status: activeTask?.status }).eq("id", startTask?.id).select()
      console.log(response)
    }
  })

  const handleDragStart = (event: DragStartEvent) => {
    const {active} = event;
    const colIndex = data.findIndex(col => col.status == active.data.current?.status)
    const activeTask = data[colIndex].items.find(item => item.id === active.id)
    setStartTask(activeTask);
    setActiveTask(activeTask)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const {over} = event

    if (over) {
      console.log('Currently over container ID:', over.id);
    }

    if (!over) return;
    if (!activeTask) return;
    
    // Target Columns
    if (over.data.current?.type === "column") {
      const newStatus = over.id.toString()

      setActiveTask((prev) => ({...prev!, status: newStatus}))
      // Clear the task from all the data 
      setData((prev) => prev.map(col =>
        ({...col, items: col.items.filter(item => item.id !== activeTask?.id)})
      ))
      // Set to hover col
      setData((prev) => prev.map(col => 
        col.status === newStatus ? {...col, items: [{...activeTask, status: newStatus}, ...col.items]} : col
      )) 
    }
    
    // Target Task in different column
    if (over.data.current?.type === "task" && over.data.current.status != activeTask?.status) {
      const newStatus = over.data.current.status

      setActiveTask((prev) => ({...prev!, status: newStatus}))
      
      // Clear the task from all the data 
      setData((prev) => prev.map(col =>
        ({...col, items: col.items.filter(item => item.id !== activeTask?.id)})
      ))
      setData((prev) => prev.map(col => 
        col.status === newStatus ? {...col, items: [{...activeTask, status: newStatus}!, ...col.items]} : col
      ))
    }

    if (over.data.current?.type === "task" && over.data.current.status == activeTask?.status) { 
      const colIndex = data.findIndex(col => col.status == activeTask!.status)
      const oldIndex = data[colIndex].items.findIndex(task => task.id == activeTask!.id);
      const newIndex = data[colIndex].items.findIndex(task => task.id == over.id);
      setData((prev) => prev.map((col, index) => 
        index === colIndex  ? {...col, items: arrayMove(col.items, oldIndex, newIndex)} : col
      ));
    }
    
    console.log("Drag Over")
    console.log(data)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return; 
    
    console.log("Drag Ended")
    console.log(data)

    const statusChanged = activeTask?.status !== startTask?.status
    if (statusChanged) {
      updateTaskMutation.mutate()
    }
  };

return (
  <DndContext
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    onDragOver={handleDragOver}
  >
      <div className="grid grid-cols-3 gap-4"> 
          {data.map(col => 
            <div key={col.title}>
              <KanbanColumn title={col.title} status={col.status} items={col.items} /> 
            </div>
          )} 
      </div>
      <DragOverlay>
        {startTask && <Task task={startTask} />}
      </DragOverlay>
  </DndContext>

)
}
