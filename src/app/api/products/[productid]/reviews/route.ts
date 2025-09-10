import { connectToMongo } from "@/config/mongoose.config";
import reviewModel from "@/schema/review.schema";
import userModel from "@/schema/user.schema";
import productModel from "@/schema/products.schema";
import { fetchUserDetail } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

void userModel;
void productModel;

export const GET = async (request: NextRequest, { params } : { params : { productid : string}}) => {
    try{
        await connectToMongo();

        const { productid } = await params;

        const reviews = await reviewModel.find({
            productId: new ObjectId(productid)
        }).populate("userId").populate('productId').populate("reply.user");
    
        const count = await reviewModel.find({
            productId: new mongoose.Types.ObjectId(productid)
        }).countDocuments()
        
        return new NextResponse(JSON.stringify({
            success: true,
            data: reviews,
            count
        }))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error fetching review for the given product id"
        }))
    }
}


export const POST = async (request: NextRequest, { params } : { params : { productid : string}}) => {
    try{
        await connectToMongo();

        const { productid } = await params;
        const { message, image } = await request.json();

        const userId = fetchUserDetail(request).id;

        const newReview = new reviewModel({
            message,
            userId: new ObjectId(userId),
            productId: new ObjectId(productid),
            image: image ?? null
        })
        const savedReview = await newReview.save();

        
        return new NextResponse(JSON.stringify({
            success: true,
            data: savedReview
        }))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error posting review"
        }))
    }
}