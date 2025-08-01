import { connectToMongo } from "@/config/mongoose.config";
import { User } from "@/libs/types";
import userModel from "@/schema/user.schema";
import { NextResponse } from "next/server";

export const GET = async () => {
    try{
        await connectToMongo();

        const users: User[] = await userModel.find({
            $or: [
                {
                    role : "customer"
                },{
                    role: "vendor"
                }
            ]
        });
        return new NextResponse(JSON.stringify({
            success: true,
            data: users
        })
        )
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Error getting all the users"
        }))
    }
}