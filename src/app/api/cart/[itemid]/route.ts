import { connectToMongo } from "@/config/mongoose.config";
import cartModel from "@/schema/cart.schema";
import productModel from "@/schema/products.schema";
import { fetchUserDetail } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params } : { params : Promise<{ itemid : string }>}) => {
    try{
        await connectToMongo();
        const { itemid } = await params;
        const userId = fetchUserDetail(request).id;

        const product = await productModel.findOne({
            _id: new mongoose.Types.ObjectId(itemid)
        })

        if(!product){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Product does not exist or deleted by vendor"
            }))
        }

        const userCart = await cartModel.findOne({
            user: new mongoose.Types.ObjectId(userId)
        })

        if(!userCart){
            return new NextResponse(JSON.stringify({
                success: true,
                data: 0
            }))
        }

        const { items } = userCart
        const isExist = items.findIndex((item: { product : string }) => item.product.toString() === itemid.toString());
        return new NextResponse(JSON.stringify({
            success: true,
            data: isExist == -1 ? 0 : items[isExist].quantity
        }))
    }catch(err: any){
         console.log(err);
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Error performing operation in database"
        }))
    }
}

export const PATCH = async (request: NextRequest, { params } : { params : Promise<{ itemid : string }>}) => {
    try{
        await connectToMongo();
        const { itemid } = await params;
        const action = new URL(request.url).searchParams.get('action')
        const userId = fetchUserDetail(request).id;

         const isCartExist = await cartModel.findOne({
                    user: new ObjectId(userId)
                });
        
        if(!isCartExist){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Cart does not exist for this user"
            }))
        }

        if(action === 'inc'){
            await cartModel.updateOne({
                user: new ObjectId(userId),
                "items.product": new ObjectId(itemid)
            }, {
               $inc: {
                "items.$.quantity": 1
               } 
            })
        }else{
            await cartModel.updateOne({
                user: new ObjectId(userId),
                "items.product": new ObjectId(itemid)
            }, {
               $inc: {
                "items.$.quantity": -1
               } 
            })
        }


        return new NextResponse(JSON.stringify({
            success: true,
            message: "Cart updated"
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Error updating quantity"
        }))
    }
}

export const DELETE = async (request: NextRequest, { params } : { params : Promise<{ itemid : string }>}) => {
    try{
        await connectToMongo();
        const { itemid } = await params;
        const userId = fetchUserDetail(request).id;

        const isCartExist = await cartModel.findOne({
                    user: new ObjectId(userId)
                });
        if(!isCartExist){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Cart does not exist for this user"
            }))
        }

        if(isCartExist.user != userId){
            return new NextResponse(JSON.stringify({
                success: false,
                message: "This cart doesn't belong to the user"
            }))
        }

        const deletedStatus = await cartModel.updateOne({
            user: new ObjectId(userId),
            "items.product": new ObjectId(itemid)
        }, {
            $pull: {
                items: {
                    product: new ObjectId(itemid)
                }
            }
        })
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Item deleted from cart"
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Error deleting quantity"
        }))
    }
}