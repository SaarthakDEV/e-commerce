import { connectToMongo } from "@/config/mongoose.config";
import cartModel from "@/schema/cart.schema";
import productModel from "@/schema/products.schema";
import userModel from "@/schema/user.schema";
import { fetchUserDetail } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

void userModel;
void productModel;

export const GET = async (request: NextRequest) => {
    try{
        await connectToMongo();

        const userId = fetchUserDetail(request).id;
        const cart = await cartModel.findOne({
            user: new ObjectId(userId)
        }).populate('user', '-password -role -email -createdAt').populate('items.product')
        
        return new NextResponse(JSON.stringify({
            success: true,
            data: cart ?? []
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Unable to fetch items in your cart"
        }))
    }
}
export const POST = async (request: NextRequest) => {
    try{
        await connectToMongo();
        const userId = fetchUserDetail(request).id
        const { productId } = await request.json();

        const isCartExist = await cartModel.findOne({
            user: new ObjectId(userId)
        });

        if(isCartExist){
            await cartModel.findByIdAndUpdate(new ObjectId(isCartExist._id), {
                $push: {
                    items: {
                        product: new ObjectId(productId)
                    }
                }
            })
        }else{
            const newCart = new cartModel({
                user: userId,
                items: [{
                    product: new ObjectId(productId)
            }]
            })
            await newCart.save();
        }

        return new NextResponse(JSON.stringify({
            success: true,
            message: "Item added to cart"
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Unable to fetch items in your cart"
        }))
    }
}