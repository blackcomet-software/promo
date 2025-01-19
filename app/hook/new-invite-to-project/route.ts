import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()
  console.log(data)
  console.log("Webhook called this!")
  return NextResponse.json({status: "success"})
}
