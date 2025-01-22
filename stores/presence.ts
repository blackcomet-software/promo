import { create } from 'zustand'

type Position = {
  x: number,
  y: number
}

type Cursor = {
  userId: string,
  userName: string,
  position: Position
}

type State = {
  cursors: Cursor[]
  updateCursor: (newCursor: Cursor) => void
}

export const usePresenceStore = create<State>((set) => ({
    cursors: [],
    updateCursor: (newCursor) => set(prev => {
        const cursorExists = prev.cursors.findIndex(x => x.userId === newCursor.userId) === -1 
        return {cursors: cursorExists ? [newCursor, ...prev.cursors] : prev.cursors.map(item => item.userId === newCursor.userId ? newCursor : item)}
      }
    )
  })
)
