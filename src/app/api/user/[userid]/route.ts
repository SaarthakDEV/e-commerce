import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userid: string } }
) => {
  try {
    const id = (await params).userid;
    const { id: userId, name, email, role, createdAt} = JSON.parse(request.cookies.get("user")?.value!);
    if(id != userId ){
        return NextResponse.redirect(new URL("/api/auth/logout", request.url));
    }

    return new NextResponse(JSON.stringify({
        success: true,
        data: {
            name,
            email,
            role,
            createdAt
        }
    }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Not able to get details of the user",
      })
    );
  }
};
