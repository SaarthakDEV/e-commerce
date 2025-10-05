import { connectToMongo } from "@/config/mongoose.config";
import userModel from "@/schema/user.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params } : { params : Promise<{ roleType: string}>}) => {
    try{
        await connectToMongo();

        const { roleType } = await params;
        console.log(roleType)

        const users = await userModel.find({ role: roleType });
        return new Response(JSON.stringify({
            success: true,
            data: users
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Not able to get user with this role"
        }))
    }
}