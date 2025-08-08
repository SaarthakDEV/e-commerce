import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The customer placing the order
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        vendor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Vendor who owns this product
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Credit Card", "Debit Card", "UPI", "PayPal"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
