import { fetchUserDetail } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params : { userid : string }}) => {
    try{
        const { userid } = await params;

        const data = fetchUserDetail(request)
        if(userid !== data.id){
            return NextResponse.redirect(new URL('/api/auth/logout', request.url));
        }

        return new NextResponse(JSON.stringify({
            success: true,
            data: data.role
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Not able to fetch user role from database"
        }))
    }
}