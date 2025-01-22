import { Node } from '@xyflow/react'
import { create } from 'zustand'

type State = {
  nodes: Node[] ,
  setNodes: (newNodes: Node[]) => void
  addNode: (node: Node) => void
  removeNode: (nodeId: string) => void
  updateNode: (node: Node) => void
}

export const useNodes = create<State>((set) => ({
  nodes: [],
  setNodes: (newNodes) => set({ nodes: newNodes }),
  addNode: (node) => set(prev => ({ nodes: [node, ...prev.nodes]})),
  removeNode: (nodeId) => set(prev => ({ nodes: prev.nodes.filter(item => item.id !== nodeId) })),
  updateNode: (node) => set(prev => ({ nodes: prev.nodes.map(item => item.id == node.id ? node : item) }))
}))
