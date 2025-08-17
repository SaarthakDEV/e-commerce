import { connectToMongo } from "@/config/mongoose.config";
import userModel from "@/schema/user.schema";
import { findUserByEmail } from "@/utils/user.controller";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const PATCH = async (request: NextRequest) => {
    try{
        await connectToMongo();

        const { email, password } = await request.json();

        const user: Document | undefined | null = await findUserByEmail( email );
        if(!user){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "No user exist"
            }))
        }

        await userModel.findByIdAndUpdate(new ObjectId(user._id), {
            password: await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        }, {
            new: true
        });
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Password resetted sucessfully"
        }))
    }catch(err){
        console.log(err)
        return new NextResponse("Response in error")
    }
}