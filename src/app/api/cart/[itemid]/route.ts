import { connectToMongo } from "@/config/mongoose.config";
import cartModel from "@/schema/cart.schema";
import { fetchUserDetail } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest, { params } : { params : { itemid : string }}) => {
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

export const DELETE = async (request: NextRequest, { params } : { params : { itemid : string }}) => {
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
        console.log(deletedStatus)
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