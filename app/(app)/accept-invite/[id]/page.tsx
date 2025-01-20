import { Button } from "@/components/ui/button"
import { db } from "@/lib/drizzle";
import { inviteToProject, project, projectMember, user } from "@/lib/drizzle/generated/schema";
import { eq } from "drizzle-orm";
import { AcceptInviteButton } from "./_components/AcceptInviteButton";
import { createClient } from "@/lib/supabase/server";

export default async function AcceptInvite(props: {params: Promise<{id: string}>}) {
  const params = await props.params
  const query = await db
          .select()
          .from(inviteToProject)
          .where(eq(inviteToProject.id, params.id))
          .leftJoin(projectMember, eq(inviteToProject.senderProjectMemberId, projectMember.id))
          .leftJoin(project, eq(projectMember.projectId, project.id))
          .leftJoin(user, eq(projectMember.userId, user.id))
          .limit(1)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className=" flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tight">You have been invited to join a project</h1>
        <p>Do you want to accept this invite {params.id}?</p>
        <p>Project: {query[0].project?.name}</p>
        <p>Invited by: {query[0].user?.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <form action={async () => {
        "use server";
        const supabase = await createClient();
        const response = await supabase.auth.getUser();
        await db.transaction(async (tx) => {
          await tx.insert(projectMember).values({userId: response.data.user?.id, projectId: query[0].project!.id })
          await tx.delete(inviteToProject).where(eq(inviteToProject.id, params.id))
        })
        await new Promise((resolve) => setTimeout(resolve, 500))
        }}>
        <AcceptInviteButton />
        </form>
        
        <form action={async () => {
          "use server";
          await db.delete(inviteToProject).where(eq(inviteToProject.id, params.id))
        }}>
      <Button variant="outline">Decline</Button>
      </form>
      </div>
    </div>
  )
}
