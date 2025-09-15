import { connectToMongo } from "@/config/mongoose.config";
import reviewModel from "@/schema/review.schema";
import { fetchUserDetail } from "@/utils/helpers";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { productid: string; reviewid: string } }
) => {
  try {
    await connectToMongo();

    const { productid, reviewid } = await params;

    const review = await reviewModel.findOne({
      _id: new ObjectId(reviewid),
    });

    if (!review) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No review found in database",
        })
      );
    }

    const userId = fetchUserDetail(request).id;
    if (userId != review.userId._id) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "You are not the author of this review",
        })
      );
    }

    const deletingStatus = await reviewModel.deleteOne({ _id: new ObjectId(reviewid) })

    if(deletingStatus.deletedCount === 0){
        return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Not able to delete review",
        })
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "review deleted",
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error deleting review",
      })
    );
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { productid: string; reviewid: string } }
) => {
  try {
    await connectToMongo();

    const { productid, reviewid } = await params;
    const { message, image } = await request.json();

    // check if review with that id exist or not
    const review = await reviewModel.findOne({
      _id: new ObjectId(reviewid),
    });

    if (!review) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No review found in database",
        })
      );
    }

    const userId = fetchUserDetail(request).id;

    // update reply
    const newReply = {
      message,
      user: userId,
      image: image ?? null,
    };

    await reviewModel.findByIdAndUpdate(
      new ObjectId(reviewid),
      {
        $push: {
          reply: newReply,
        },
      },
      {
        new: true,
      }
    );

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Reply posted",
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error posting reply for that review",
      })
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { productid: string; reviewid: string } }
) => {
  try {
    await connectToMongo();

    const { productid, reviewid } = await params;
    const { message, image } = await request.json();

    // check if review with that id exist or not
    const review = await reviewModel.findOne({
      _id: new ObjectId(reviewid),
    });

    if (!review) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No review found in database",
        })
      );
    }

    const userId = fetchUserDetail(request).id;
    if (userId != review.userId._id) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "You are not the author of this review",
        })
      );
    }

    await reviewModel.findByIdAndUpdate(
      new ObjectId(reviewid),
      {
        message: message,
        image: image ?? null,
      }
    );


    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Review updated",
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error updating review for that review",
      })
    );
  }
};
