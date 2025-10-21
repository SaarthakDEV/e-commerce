import { connectToMongo } from "@/config/mongoose.config";
import { getAll } from "@/utils/user.controller";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/libs/types";
import jwt from "jsonwebtoken";
import { corsResponse } from "@/utils/cors";

export const POST = async (request: NextRequest) => {
  console.log("here")
  const cors = corsResponse(request);
  if (request.method === "OPTIONS") return cors;
  try {
    await connectToMongo();

    const { email, password } = await request.json();

    const users: User[] = await getAll();
    const isUserExist: User | undefined = users.find(
      (user) => user.email === email
    );

    if (!isUserExist) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User does not exist",
        })
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password!
    );

    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Wrong password",
        })
      );
    }
    // Signing jwt token
    const token = jwt.sign(
      {
        id: isUserExist._id,
        name: isUserExist.name,
        email,
        role: isUserExist.role,
        createdAt: isUserExist.createdAt
      },
      process.env.JWT_SECRET!,
      { expiresIn: 60 * 60 * 24 * 7 }
    );

    const response = new NextResponse(
      JSON.stringify({
        success: true,
        message: "Login successfull",
        token,
      }),
      {
        status: 200,
      }
    );

    response.cookies.set("token", token, {
      httpOnly: false,
      secure: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Some error encountered while loggin in",
      }),
      {
        status: 404,
      }
    );
  }
};
