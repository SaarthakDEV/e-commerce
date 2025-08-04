import { connectToMongo } from "@/config/mongoose.config";
import productModel from "@/schema/products.schema";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request: NextRequest) => {
    try{
        await connectToMongo();
        const category = new URL(request.url).searchParams.get("category")

        if(!category || category === 'all'){
            const products = await productModel.find();
            return new NextResponse(JSON.stringify({
                success: true,
                data: products
            }))
        }

        const products = await productModel.find({
            category
        }).populate('vendor', '-password')

        return new NextResponse(JSON.stringify({
            success: true,
            data: products
        }))
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error getting request product"
        }))
    }
}

export const POST = async (request: NextRequest) => {
    try{
        await connectToMongo();

        const { name, description, image, price, stock, category } = await request.json();

        const vendorData = request.cookies.get('user');
        const vendorId = JSON.parse(vendorData?.value!).id;
        
        const newProduct = new productModel({
            name,
            description,
            image,
            price,
            stock: stock || undefined,
            vendor: new ObjectId(vendorId),
            category
        })

        const savedProduct = await newProduct.save();
        return new NextResponse(JSON.stringify({
            success: true,
            data: savedProduct
        }));
    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Unable to save product in database"
        }))
    }
}