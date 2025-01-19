import { NextResponse } from "next/server"

export async function POST() {
  console.log("Webhook called this!")
  return NextResponse.json({status: "success"})
}
