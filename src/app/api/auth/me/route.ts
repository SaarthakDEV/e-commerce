import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const GET = (request: NextRequest) => {
    try{
        // console.log(request.headers.get("authorization"))
        const header: String = request.headers.get("authorization")!
        const authSplit: String[] = header.split(" ")
        if(authSplit[0] !== 'Bearer'){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Unauthorized"
            }), {
                status: 403
            })
        }

        const data = jwt.verify(authSplit[1].toString(), process.env.JWT_SECRET!.toString());
        return new NextResponse(JSON.stringify({
            success: true,
            data
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Invalid user"
        }))
    }
}