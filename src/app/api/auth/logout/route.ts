import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const response = new NextResponse("Logged out");

    response.cookies.set("token", "", {
    httpOnly: false,
    secure: true,
    expires: new Date(0),
    path: "/"
  });


  return response;
}