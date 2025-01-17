import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from '@dnd-kit/core';
import { Task } from "./task";

export function KanbanColumn(props: { title: string, status: string, items: Task[] }) {
  const { setNodeRef } = useDroppable({
    id: `${props.status}`,
    data: {
      type: "column"
    }
  });

  return (
    <Card ref={setNodeRef}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableContext items={props.items.map(x => x.id)}>
          <div className="flex flex-col gap-2">
            {props.items.map(x => <Task key={x.id} task={x} />)}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  )
}
