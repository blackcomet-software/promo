import { db } from "@/lib/drizzle";
import { healthcheck, moduleWebsite } from "@/lib/drizzle/generated/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const websites = await db.select({ id: moduleWebsite.id, url: moduleWebsite.url, healthcheckPath: moduleWebsite.healthcheckPath }).from(moduleWebsite)

  const pings = websites
    .map(website => fetch(website.url! + website.healthcheckPath, { method: 'HEAD' })
    .then(x => ({id: website.id, status: x.status, url: x.url}) ))
  
  const data = await Promise.all(pings)
  
  const values = data.map(x => ({ module: x.id, up: Math.floor(x.status / 100) === 2 }))
  await db.insert(healthcheck).values(values)
  
  return NextResponse.json(values)
}
