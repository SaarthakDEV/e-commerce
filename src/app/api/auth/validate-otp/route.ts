import { connectToMongo } from "@/config/mongoose.config";
import otpModel from "@/schema/otp.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request : NextRequest) => {
    try{
        await connectToMongo();

        const { email, otp } = await request.json();

        // Check for present otp in database
        const allOtps = await otpModel.find();
        const isOtpExist = allOtps.find(entry => entry.email === email);

        if(!isOtpExist){
            return new NextResponse(JSON.stringify({
                status:false,
                message: "Please request otp first"
            }))
        }

        if(isOtpExist.otp === Number(otp)){
            return new NextResponse(JSON.stringify({
                success: true,
                message: "Otp validated successfully"
            }))
        }else{
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Incorrect otp please try again"
            }))
        }
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error validating otp"
        }))
    }
}