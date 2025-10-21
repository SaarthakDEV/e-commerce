import { NextResponse } from "next/server";

export function corsResponse(req: Request) {
  const origin = req.headers.get("origin");
  console.log(origin)

  const allowedOrigins = [
    "http://localhost:3000",
    "https://shop.devsaarthak.fun",
  ];

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin || "")
      ? origin!
      : "https://shop.devsaarthak.fun", // default safe origin
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // If it's a preflight request, respond immediately
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }

  return headers;
}
