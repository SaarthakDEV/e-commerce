
import { Order, ProcessedOrder } from "@/libs/types";
import { NextRequest } from "next/server";
import { logout } from "./api/auth";

export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generateTimestamp = () => {
  const date = new Date();

  // Add leading zero
  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = pad(date?.getDate());
  const month = pad(date?.getMonth() + 1);
  const year = date?.getFullYear();
  const hours = pad(date?.getHours());
  const minutes = pad(date?.getMinutes());
  const seconds = pad(date?.getSeconds());

  return `${day}${month}${year}${hours}${minutes}${seconds}`;
};

export const fetchUserDetail = (request: NextRequest) => {
  const payload = JSON.parse(request?.cookies?.get("user")?.value!);
  return payload;
};

export const getAuthHeader = () => {
  if (typeof document === "undefined") {
    return ""; // running on server, no cookies available
  }
  const value = `; ${document.cookie}`;
  const parts = value?.split(`; token=`);
  const token = parts?.pop()?.split(";")?.shift();
  if (!token) {
    window.location.href = "/";
  }
  return token;
};

export const processCreatedAtV = (createdAt: string) => {
  const d = new Date((createdAt));
  return `${d?.getDate()}/${d?.getMonth() + 1}/${d?.getFullYear()}`;
};

export const processCreatedAtC = (createdAt: string) => {
  const d = new Date(Number(createdAt));
  return `${d?.getDate()}/${d?.getMonth() + 1}/${d?.getFullYear()}`;
};

export const processData = (data: Order[]) => {
  const processed_data = data?.map((order: Order) => {
    const {
      _id: orderId,
      user,
      items,
      shippingAddress,
      orderStatus,
      paymentStatus,
      createdAt,
    } = order;
    const date = processCreatedAtV(createdAt);
    const quantity = items[0]?.quantity;
    const { _id: productId, name: productName } = items[0]?.product;
    const { name } = user;
    return {
      orderId,
      productId,
      productName,
      quantity,
      userName: name,
      date,
      shippingAddress,
      status: orderStatus,
      paymentStatus,
    };
  });

  return processed_data;
};

export const handleLogout = async () => {
  await logout();
  window.location.href = "/";
};

export const processOrder: (data2: any) => ProcessedOrder[] = (data) => {

  const processedData = data?.map((order: any) => {
    const {
      _id,
      orderStatus: status,
      items,
      shippingAddress,
      createdAt,
    } = order;
    const d = new Date(createdAt)
    const orderData = items?.map((item: any) => ({
      id: _id,
      status,
      shippingAddress,
      amount: item?.price * item?.quantity,
      productName: item?.product?.name,
      productImage: item?.product?.image,
      productPrice: item?.product?.price,
      quantity: item?.quantity,
      date: `${d?.getDate()}/${d?.getMonth() + 1}/${d?.getFullYear()}`,
    }));
    return orderData;
  });
  return processedData?.flat();
};

export const formatPrice = (price: number) => {
    return `$${price?.toFixed(2)}`;
  };

export const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "woman":
      case "women":
        return "👩";
      case "mens":
      case "men":
        return "👨";
      case "kids":
        return "🧒";
      default:
        return "🏷️";
    }
  };

  export const getCategoryLabel = (category: string) => {
    switch (category?.toLowerCase()) {
      case "woman":
        return "Women's";
      case "mens":
        return "Men's";
      case "kids":
        return "Kids";
      default:
        return category;
    }
  };

  export const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  export const getStockStatus = (product: { stock: number }) => {
    if (product?.stock === 0)
      return {
        text: "Out of Stock",
        color: "text-red-600",
        bgColor: "bg-red-50",
      };
    if (Number(product?.stock) <= 5)
      return {
        text: `Only ${product?.stock} left!`,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    return {
      text: "In Stock",
      color: "text-green-600",
      bgColor: "bg-green-50",
    };
  };