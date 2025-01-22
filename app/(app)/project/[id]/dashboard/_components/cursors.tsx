"use client"
import { usePresenceStore } from "@/stores/presence";
import { Cursor } from "./cursor";
import { useUser } from "@/hooks/use-user";

export function Cursors() {
  const user = useUser();
  const cursors = usePresenceStore(state => state.cursors)
  return (
    <>
      {cursors.map(cursor => cursor.userId != user.data?.public.id && <Cursor key={`cursor_${cursor.userId}`} cursor={cursor} />)}
    </>
  )
}
