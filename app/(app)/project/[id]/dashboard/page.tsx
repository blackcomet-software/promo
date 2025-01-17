"use client";

import { ModuleNode } from "@/components/nodes/module-node";
import { Input } from "@/components/ui/input";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initialNodes = [
  { id: "test", position: { x: 0, y: 0 }, data: {}, type: "website" },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const nodeTypes = { website: ModuleNode };

export default function Dashboard() {
  const [nodes, setNodes] = useState(initialNodes);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  return (
    <div className="flex-1 w-full h-full relative">


      <Input
        placeholder="Add a module"
        className="absolute bg-background z-50 top-10 left-1/2 -translate-x-1/2 mx-auto max-w-md"
      />


      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={initialEdges}
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
