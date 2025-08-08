import { connectToMongo } from "@/config/mongoose.config";
import orderModel from "@/schema/order.schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { orderid: string } }
) => {
  try {
    await connectToMongo();
    const { orderid } = await params;

    const isOrderExist = await orderModel.findById(
      new mongoose.Types.ObjectId(orderid)
    );
    if (!isOrderExist) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No order exist with this id",
        })
      );
    }

    switch (isOrderExist.orderStatus) {
      case "processing": {
        await orderModel.findByIdAndUpdate(
          new mongoose.Types.ObjectId(orderid),
          {
            $set: {
              orderStatus: "cancelled",
              paymentStatus: "refunded"
            },
          }
        );
        return new NextResponse(
          JSON.stringify({
            success: true,
            message:
              "Order cancelled and refunded",
          })
        );
      }
      case "cancelled": {
        return new NextResponse(
          JSON.stringify({
            success: false,
            message:
              "Cannot cancel this order since it has already been shipped or delivered",
          })
        );
      }
      default: {
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: "Order had already been cancelled",
          })
        );
      }
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error changing order status. Please try again later",
      })
    );
  }
};
