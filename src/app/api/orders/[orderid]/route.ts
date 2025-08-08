import { connectToMongo } from "@/config/mongoose.config";
import orderModel from "@/schema/order.schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { orderid : string}}) => {
    try{
        await connectToMongo();
        const { orderid } = await params;

        const order = await orderModel.findOne({
            _id: new mongoose.Types.ObjectId(orderid)
        }).populate('items.product').populate('items.vendor');

        if(!order){
            return new NextResponse(JSON.stringify({
                success: true,
                data: []
            }))
        }

        return new NextResponse(JSON.stringify({
            success: true,
            data: order
        }))

    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error getting details of the order"
        }))
    }
}