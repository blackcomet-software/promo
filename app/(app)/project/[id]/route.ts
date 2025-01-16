import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const newPath = `${url.pathname}/dashboard`;

  return NextResponse.redirect(new URL(newPath, url.origin));
}
