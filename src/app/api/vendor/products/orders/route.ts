import { connectToMongo } from "@/config/mongoose.config";
import orderModel from "@/schema/order.schema";
import productModel from "@/schema/products.schema";
import userModel from "@/schema/user.schema";
import { fetchUserDetail } from "@/utils/helpers";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

void userModel;

export const GET = async (request: NextRequest) => {
  try {
    await connectToMongo();

    const vendorId = await fetchUserDetail(request).id;


    const products = await productModel.find({
      vendor: new mongoose.Types.ObjectId(vendorId)
    }).populate('vendor', '-password');
    const productsId = products.map(product => product._id.toString())


  const ordersArray = await Promise.all(
      productsId.map(async (productId) => {
        const orders = await orderModel
          .find({ "items.product": productId })
          .populate('user', '-password')
          .populate('items.product')
          .lean();
        return orders.map(order => ({
          ...order,
          items: order.items.filter(
            (item: { product: mongoose.Types.ObjectId }) =>
              item.product._id.toString() === productId
          )
        }));
      })
    );

    const processedOrders = ordersArray.flat();


    return new NextResponse(
      JSON.stringify({
        success: true,
        data: processedOrders,
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error fetching orders for the given Vendor",
      })
    );
  }
};
