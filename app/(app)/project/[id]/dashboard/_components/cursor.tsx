import { useReactFlow } from "@xyflow/react";
import { MousePointer2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Cursor(props: {cursor: {userId: string, userName: string, position: {x: number, y: number}}}) {
  const [hover, setHover] = useState(false);
  const instance = useReactFlow()
  const renderPosition = instance.flowToScreenPosition(props.cursor.position)
  const color = "#f00"
  return (
    <div className="fixed z-50 w-full max-w-sm" style={{ top: renderPosition.y, left: renderPosition.x }} onMouseLeave={() => setHover(false)}>
      <MousePointer2 fill={color} color={color} onMouseOver={() => setHover(true)}  />
      <AnimatePresence>
      {hover && <motion.div className="absolute left-4 top-4 text-sm text-white font-semibold px-1.5 py-0.5 rounded-full cursor-default line-clamp-1 select-none" style={{ backgroundColor: color, opacity: 0, }} animate={{ opacity: 100}} exit={{ opacity: 0}}>
        <p>{props.cursor.userName}</p>
      </motion.div>}
      </AnimatePresence>
    </div>
  )
}
