import { db } from "@/lib/drizzle"
import { notification, usersInAuth } from "@/lib/drizzle/generated/schema"
import { Tables } from "@/types/database.types"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

type WebhookData = {
  type: "INSERT",
  table: "invite_to_project",
  record: Tables<"invite_to_project">,
  schema: "public",
  old_record: null
}

export async function POST(req: Request) {
  const data = await req.json() as WebhookData

  const query = await db.select().from(usersInAuth).where(eq(usersInAuth.email, data.record.target_email)).limit(1)
  if (query.length === 0) {
    return NextResponse.json({status: "success"})
  } 

  const user = query[0];
  await db.insert(notification).values({ targetUserId: user.id, message: "You have been invited to a project!"})

  return NextResponse.json({status: "success"})
}
