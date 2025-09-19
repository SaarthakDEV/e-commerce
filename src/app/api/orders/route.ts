import { connectToMongo } from "@/config/mongoose.config";
import cartModel from "@/schema/cart.schema";
import orderModel from "@/schema/order.schema";
import productModel from "@/schema/products.schema";
import userModel from "@/schema/user.schema";
import { fetchUserDetail } from "@/utils/helpers";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

void productModel;
void userModel;

export const GET = async (request: NextRequest) => {
  try {
    await connectToMongo();
    const userId = fetchUserDetail(request).id;

    const orders = await orderModel
      .find({
        user: new mongoose.Types.ObjectId(userId),
      })
      .populate("items.product")
      .populate("items.vendor");
    if (!orders) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: [],
        })
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: orders,
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error getting orders for that user",
      })
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectToMongo();
    const userId = fetchUserDetail(request).id;
    const { items, address, pay_method, pay_status, amount, status } = await request.json();
    const modified = [];

      // check for qunatity if available

      const modifiedItem = await Promise.all(items.map(async (item: { product: string, quantity: number}) => {
        const { product, quantity } = item
        const { stock } = await productModel.findById(product);
        if(stock < quantity){
          item.quantity = stock;
          modified.push(item);
          return item
        }else{
          return item;
        }
      })
    );


    const newOrder = new orderModel({
        user: userId,
        items: modifiedItem,
        orderStatus: status ?? undefined,
        shippingAddress: address,
        paymentMethod: pay_method,
        paymentStatus: pay_status,
        totalAmount: amount
    });
    await newOrder.save();

    // update quantity from database
    const bulkOps = modifiedItem.map((item: { product: string, quantity: number }) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { stock: -item.quantity } },
      },
    }));

    // clear cart

    await cartModel.deleteOne({
      user: new mongoose.Types.ObjectId(userId)
    })

    await productModel.bulkWrite(bulkOps);

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: modified,
        id: newOrder._id
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error in creating order",
      })
    );
  }
};
