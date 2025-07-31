import { connectToMongo } from "@/config/mongoose.config";
import userModel from "@/schema/user.schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/libs/types";
import { getAll } from "@/utils/user.controller";

export const POST = async (request: NextRequest) => {
  try {
    await connectToMongo();
    const { name, email, password, role } = await request.json();

    // checking if user already exists
    const users: User[] = await getAll();
    console.log(users);

    const isUserExist = users.find((user) => user.email === email);

    if (isUserExist) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User already exist",
        })
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role
    });

    const savedUser: User = await newUser.save();

    return new NextResponse(
      JSON.stringify({
        success: true,
        user: savedUser,
      }),
      {
        status: 201,
        statusText: "ok",
      }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return new NextResponse("Error saving user", { status: 500 });
  }
};
