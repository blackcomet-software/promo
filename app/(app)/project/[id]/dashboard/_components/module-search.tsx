import { useEffect, useMemo, useState } from "react";
import {useDialog} from "@/stores/dialog"
import { Input } from "@/components/ui/input";


export function ModuleSearch() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("");
  const openDialog = useDialog((state) => state.open)

  useEffect(() => {
    if (text.length > 0 && !open) {
      setOpen(true);
    }
    if (text.length == 0) {
      setOpen(false);
    }
  }, [open, text.length])
  

  const moduleSearchItems = useMemo(() => [
  {
    type: "website", 
    label: "Website", 
    callback: () => openDialog("website")
  },
  {
    type: "cms",
    label: "Content Management System",
    callback: () => console.log("Open create cms dialog")
  }
], [openDialog])
  return (
     <div className="absolute z-10 top-10 left-1/2 -translate-x-1/2 mx-auto max-w-md w-full">
        <Input
          placeholder="Add a module"
          className="relative bg-background w-full z-30"
          onChange={(event) => setText(event.target.value)}
          value={text} 
        />
        {open && <div className="relative w-full max-h-80 bg-background border rounded-b -mt-2 pt-2 z-20">
          <div className="flex flex-col divide-y mx-2">
            {moduleSearchItems.map(item => 
            <div key={item.type}className="py-2" 
              onClick={() => {
                setText("")
                item.callback()
              }}
            >
              <p>{item.label}</p>
            </div>
          )}
       
          </div>
        </div>}
      </div>
  )
}
