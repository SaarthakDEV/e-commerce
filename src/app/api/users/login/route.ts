import { connectToMongo } from "@/config/mongoose.config";
import { getAll } from "@/utils/user.controller";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/libs/types";

export const POST = async (request: NextRequest) => {
    try{
        await connectToMongo();

        const { email, password } = await request.json();

        const users: User[] = await getAll();
        const isUserExist: User | undefined = users.find(user => user.email === email)

        if(!isUserExist){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "User does not exist"
            }))
        }


        const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

        if(!isPasswordValid){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Wrong password"
            }))
        }


        return new NextResponse(JSON.stringify({
            success: true,
            message: "Login successfull"
        }), {
            status: 200
        })

    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Some error encountered while loggin in"
        }), {
            status: 404
        })
    }
}