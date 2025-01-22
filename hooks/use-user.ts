import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => useQuery({
    queryKey: ["authenticated_user"],
    queryFn: async () => {
      const supabase = createClient();
      const privateResponse = await supabase.auth.getUser();
      const publicResponse = await supabase.from("user").select().eq("id", privateResponse.data.user!.id).single()      
      return {private: privateResponse.data.user, public: publicResponse.data }
    }
  })
