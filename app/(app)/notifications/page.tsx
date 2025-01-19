import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";

export default async function Notfications() {
  const supabase = await createClient();
  const response = await supabase.from("notification").select()

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <h1 className="font-black text-4xl tracking-tight">Notifications</h1>
      <div>
        <Input placeholder="Search" />
        {response.data.map(x => <p key={x.id}>{x.message}</p>)}
      </div>
    </div>
  )
}
