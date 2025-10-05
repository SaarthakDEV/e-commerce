import { connectToMongo } from "@/config/mongoose.config"
import { User } from "@/libs/types";
import otpModel from "@/schema/otp.schema";
import { generateOtp, generateTimestamp } from "@/utils/helpers";
import { sendEmail } from "@/utils/send-email";
import { findUserByEmail } from "@/utils/user.controller";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try{
        await connectToMongo();

        const { email } = await request.json();

        const isUserExist: User | undefined | null = await findUserByEmail( email )

        if(!isUserExist){
            return new Response(JSON.stringify({
                success: false,
                message: "No user exists with this email"
            }))
        }
        // send email'
        const otp = generateOtp()
        const emailStatus = await sendEmail(isUserExist.email!, otp);
        console.log("Email status", emailStatus)


        // check if there exist already otp with same email
        const isOtpExist = await otpModel.findOne({
            email: isUserExist.email
        })
        console.log(isOtpExist);

        if(isOtpExist){
            await otpModel.findOneAndDelete({
                email: isUserExist.email
            })
        }
        const newOtp = new otpModel({
            email: isUserExist.email,
            otp,
            timestamp: generateTimestamp()
        })

        const savedOtp = await newOtp.save();

        return new NextResponse(JSON.stringify({
            success: true,
            message: savedOtp
        }))

    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error validating your email"
        }))
    }
}