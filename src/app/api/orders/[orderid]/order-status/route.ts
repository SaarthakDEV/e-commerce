import { connectToMongo } from "@/config/mongoose.config";
import orderModel from "@/schema/order.schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params : Promise<{ orderid: string }>}) => {
    try{
        await connectToMongo();
        const { orderid } = await params;

        const isOrderExist = await orderModel.findById(new mongoose.Types.ObjectId(orderid))
        if(!isOrderExist){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "No order exist with this id"
            }))
        }

        return new NextResponse(JSON.stringify({
            success: true,
            message: isOrderExist.orderStatus
        }))
    }catch(err){
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error changing order status. Please try again later"
        }))
    }
}