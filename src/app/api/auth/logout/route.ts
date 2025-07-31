import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    // const { token } = await request.json();
    const response = new NextResponse("Logged out");

    response.cookies.set("token", "abc", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/"
  });


  return response;
}