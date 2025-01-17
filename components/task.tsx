"use client";

import { Card, CardHeader, CardTitle } from "./ui/card";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export type Task = {
  id: string,
  title: string,
  status: string
}

export function Task(props: { task: Task }) {
  const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({ id: props.task.id, data: { type: "task", status: props.task.status } });
  return (
    <Card
      ref={setNodeRef}
      className={isDragging ? "bg-muted" : ""}
      style={{
        transition,
        transform: CSS.Transform.toString(transform)
      }}
      {...attributes}
      {...listeners}
    >
      <CardHeader>
        <CardTitle className={isDragging ? "text-muted" : ""}>{props.task.title}</CardTitle>
      </CardHeader>
    </Card>
  )
}
