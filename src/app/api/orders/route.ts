import { connectToMongo } from "@/config/mongoose.config";
import orderModel from "@/schema/order.schema";
import productModel from "@/schema/products.schema";
import userModel from "@/schema/user.schema";
import { fetchUserDetail } from "@/utils/helpers";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

void productModel;
void userModel;

export const GET = async (request: NextRequest) => {
  try {
    await connectToMongo();
    const userId = fetchUserDetail(request).id;

    const orders = await orderModel.find({
      user: new mongoose.Types.ObjectId(userId),
    }).populate('items.product').populate('items.vendor');
    if (!orders) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: [],
        })
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: orders,
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error getting orders for that user",
      })
    );
  }
};


export const POST = async (request: NextRequest) => {
    try{
        await connectToMongo();
        const userId = fetchUserDetail(request).id;
        const { items, address, pay_method, pay_status, amount, status } = await request.json();

        const newOrder = new orderModel({
            user: userId,
            items,
            orderStatus: status ?? undefined,
            shippingAddress: address,
            paymentMethod: pay_method,
            paymentStatus: pay_status,
            totalAmount: amount
        });
        const savedOrder = await newOrder.save();

            return new NextResponse(
      JSON.stringify({
        success: false,
        data: savedOrder,
      })
    );
    }catch(err){
        console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error in creating order",
      })
    );
    }
}