import userModel from "@/app/schema/user.schema";
import { Document } from "mongoose";
import { NextResponse } from "next/server";
type User = {
    name?: string;
    email?: string;
    password?: string;
} & Document;

export const POST = async (request: Request) => {
    try {
        const { name, email, password } = await request.json();
        
        const newUser = new userModel({
            name,
            email,
            password
        });

        const savedUser: User = await newUser.save();

        return new NextResponse(JSON.stringify(savedUser));
    } catch (error) {
        console.error("Error saving user:", error);
        return new NextResponse("Error saving user", { status: 500 });
    }
};
