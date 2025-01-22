import { create } from 'zustand'

type State = {
  type: string,
  isOpen: boolean,
  setIsOpen: (arg: boolean) => void,
  open: (arg: string) => void
}

export const useDialog = create<State>((set) => ({
  type: "",
  isOpen: false,
  setIsOpen: (newOpen) => set({isOpen: newOpen}),
  open: (dialogType: string) => set({ isOpen: true, type: dialogType }),
}))
