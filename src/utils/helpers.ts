import { ItemsProduct, Order } from "@/libs/types";
import { NextRequest } from "next/server";
import { useCookies } from 'react-cookie';

export const generateOtp = () => {
    const rand = Math.random();
    const nu = rand * 10000
    return Math.floor(nu);
}

export const generateTimestamp = () => {
    const date = new Date();

    // Add leading zero
    const pad = (num: number) => num.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); 
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}${month}${year}${hours}${minutes}${seconds}`;
}

export const fetchUserDetail = (request: NextRequest) => {
    const payload = JSON.parse(request.cookies.get('user')?.value!);
    return payload
}

export const getAuthHeader = () => {
     if (typeof document === "undefined") {
    return ""; // running on server, no cookies available
  }
  const value = `; ${document.cookie}`;
   const parts = value.split(`; token=`);
     const token = parts.pop()?.split(';').shift();
    if(!token){
        window.location.href='/'
    }
    return token;
}

export const processCreatedAt = (createdAt: string) => {
    const d = new Date(Number(createdAt));
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

export const processData = (data: Order[]) => {

  const processed_data = data.map((order: Order) => {
    const { _id: orderId, user, items, shippingAddress, orderStatus, paymentStatus, createdAt } = order
    const date = processCreatedAt(createdAt)
    const quantity = items[0].quantity
    const { _id: productId, name: productName } = items[0].product
    const { name } = user
    return {
      orderId,
      productId,
      productName,
      quantity,
      userName: name,
      date,
      shippingAddress,
      status: orderStatus,
      paymentStatus
    }

  });

  return processed_data
};
