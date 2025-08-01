import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Decode JWT safely in middleware
async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  console.log("in middleware")
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const response = NextResponse.next();
  response.cookies.set("user", JSON.stringify(payload), {
    secure: true,
    httpOnly: true
  });

  if(request.nextUrl.pathname.startsWith("/api/user/role") || request.nextUrl.pathname === "/api/user"){
    if(payload.role !== 'admin'){
        return new NextResponse("Sorry you are not authorised for it")
    }
  }
  return response;
}


export const config = {
  matcher: ["/api/user/:path*", "/((?!api/auth/)*)"],
};
