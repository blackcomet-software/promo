"use client";

import { CmsNode } from "@/components/nodes/cms";
import { ModuleNode } from "@/components/nodes/module-node";
import { useNodeSync } from "@/hooks/use-node-sync";
import { createClient } from "@/lib/supabase/client";
import { useNodes } from "@/stores/nodes";
import { usePresenceStore } from "@/stores/presence";
import { applyNodeChanges, Background, BackgroundVariant, Controls, Edge, Node, OnNodeDrag, OnNodesChange, ReactFlow, ReactFlowInstance } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import throttle from 'lodash.throttle';
import { ModuleSearch } from "./module-search";
import { Cursors } from "./cursors";
import { useUser } from "@/hooks/use-user";
import { DialogManager } from "./dialog-manager";

const nodeTypes = { website: ModuleNode, cms: CmsNode }

const updateNodePosition = async (id: string, coord: {x: number, y: number}) => {
    const supabase = createClient();
    const response = await supabase.from("node").update({x_coord: coord.x, y_coord: coord.y }).eq("id", id)
    console.log(response)
  }

export function GraphEditor(props: {initialNodes: Node[], initialEdges: Edge[]}) {
  const setNodes = useNodes(state => state.setNodes) 
  const nodes = useNodes(state => state.nodes)
  const [instance, setInstance] = useState<ReactFlowInstance>()
  const updateCursor = usePresenceStore(state => state.updateCursor)
  const supabase = createClient()
  const user = useUser()

  // Load nodes into client store
  useEffect(() => {
    setNodes(props.initialNodes)
  }, [props.initialNodes, setNodes])
  
  // Sync layer between database and client store
  useNodeSync()
    
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel("canvas")

    channel
      .on(
        'broadcast',
        { event: 'test' },
        (payload) => updateCursor(payload.payload)
      )
      .subscribe()

  }, [updateCursor])
  
  const throttledMouseBroadcast = useCallback( 
    throttle(
      (userId: string, position: {x: number, y: number}, userName: string) => { 
        supabase.channel("canvas").send({
          type: "broadcast",
          event: "test",
          payload: {userId, userName, position}
        })
      },
      100
    ), [supabase])

  const onMouseMove = useCallback((event: React.MouseEvent) => {
    if (!instance || !user.data?.public.id) return;
    
    // translate mouse position to graph position
    const position = instance.screenToFlowPosition({x: event.clientX, y: event.clientY}) 
    throttledMouseBroadcast(user.data.public.id, position, user.data.public.name) 
  }, [instance, throttledMouseBroadcast, user.data?.public.id])

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes)),
    [nodes, setNodes],
  );

  const onNodesDragStop: OnNodeDrag = useCallback(
    (_, node) => {
      updateNodePosition(node.id, node.position)
    },
    []
  );
  
  return (
    <div className="flex-1 w-full h-full relative">
      <ModuleSearch /> 
      <DialogManager />
      <ReactFlow
        onInit={(newInstance) => setInstance(newInstance) }
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={props.initialEdges}
        onNodeDragStop={onNodesDragStop}
        onPaneMouseMove={onMouseMove}
        
        fitView
      >
        <Controls />
        <Cursors />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
