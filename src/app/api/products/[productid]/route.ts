import { connectToMongo } from "@/config/mongoose.config";
import productModel from "@/schema/products.schema";
import userModel from "@/schema/user.schema";
import { fetchUserDetail } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

await new userModel();

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ productid: string }> }
) => {
  try {
    await connectToMongo();

    const { productid } = await params;

    const product = await productModel.findOne({
      _id: new ObjectId(productid),
    }).populate('vendor', '-password');

    if (!product) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No product exists",
        })
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: product,
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error fetching product details from database",
      })
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ productid: string }> }
) => {
  try {
    await connectToMongo();

    const { productid } = await params;

    const product = await productModel.findOne({
      _id: new ObjectId(productid),
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No product exists",
        })
      );
    }

    const vendorDetails = fetchUserDetail(request);

    if (vendorDetails.id != product.vendor.toString()) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "You must be the owner of this product post to update it",
        })
      );
    }
    const { name, description, image, price, stock, category } =
      await request.json();

    const updatedProduct = await productModel.findByIdAndUpdate(
      new ObjectId(productid),
      {
        name,
        description,
        image,
        price,
        stock: stock || undefined,
        vendor: new ObjectId(vendorDetails.id),
        category,
      },
      {
        new: true,
      }
    ).populate('vendor', '-password');

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: updatedProduct,
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error updating product details in database",
      })
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ productid: string }> }
) => {
  try {
    await connectToMongo();

    const { productid } = await params;

    const product = await productModel.findOne({
      _id: new ObjectId(productid),
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No product exists",
        })
      );
    }

    const vendorDetails = fetchUserDetail(request);

    if (vendorDetails.id != product.vendor || vendorDetails.role !== "admin") {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "You must be the owner of this product post to delete it",
        })
      );
    }

    const deletedDetails = await productModel.deleteOne({
      _id: new ObjectId(productid),
    });

    if (deletedDetails.deletedCount == 0) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Not able to delete product",
        })
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Product successfully deleted",
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error deleting product details from database",
      })
    );
  }
};
