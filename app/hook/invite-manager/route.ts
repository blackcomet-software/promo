import { db } from "@/lib/drizzle";
import { inviteToProject } from "@/lib/drizzle/generated/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const allInvites = await db.select().from(inviteToProject)
  console.log(allInvites)
 return NextResponse.json(allInvites) 
}
