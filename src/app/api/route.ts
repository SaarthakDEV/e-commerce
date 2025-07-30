import { NextResponse } from "next/server";
import { connectToMongo } from "../../config/mongoose.config";

export const GET = async () => {
  await connectToMongo();
  return new NextResponse("Server is listening");
};
