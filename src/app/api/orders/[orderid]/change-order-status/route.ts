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

        let newStatus;
        switch(isOrderExist.orderStatus){
            case 'processing': {
                newStatus = 'shipped'
                break;
            }
            case 'shipped': {
                newStatus = "delivered"
                break;
            }
            case 'delivered': {
                return new NextResponse(JSON.stringify({
                    success: false,
                    message: "Order is already delivered"
                }))
            }
            case 'cancelled': {
                return new NextResponse(JSON.stringify({
                    success: false,
                    message: "Order had already been cancelled"
                }))
            }
            default: {
                return new NextResponse()
            }
        }

        await orderModel.findByIdAndUpdate(new mongoose.Types.ObjectId(orderid), {
            $set: {
                orderStatus: newStatus
            }
        })
        return new NextResponse(JSON.stringify({
            success: true,
            message: `Changed to ${newStatus}`
        }))
    }catch(err){
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error changing order status. Please try again later"
        }))
    }
}