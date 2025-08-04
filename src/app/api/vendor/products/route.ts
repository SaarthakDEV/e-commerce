import { connectToMongo } from "@/config/mongoose.config";
import productModel from "@/schema/products.schema";
import { fetchUserDetail } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
        try{
            await connectToMongo();

            const vendorId = fetchUserDetail(request).id;
            console.log(vendorId)
            const products = await productModel.find({
                vendor : new ObjectId(vendorId)
            }).populate('vendor', '-password')

            if(products.length === 0){
                return new NextResponse(JSON.stringify({
                    success: false,
                    message: "No product is posted by the given vendor"
                }))
            }

            return new NextResponse(JSON.stringify({
                success: true,
                data: products
            }))
            // return new NextResponse(products)
        }catch(err){
            console.log(err);
            return new NextResponse("Error getting details of product posted by this vendor")
        }
}