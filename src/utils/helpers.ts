import { ItemsProduct, Order } from "@/libs/types";
import { NextRequest } from "next/server";
import { useCookies } from 'react-cookie';
import { logout } from "./api/auth";

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


export const handleLogout = async () => {
    await logout();
    window.location.href = "/"

  }

export const processOrder = (data2) => {
  const data = [
    {
        "_id": "68a31c87c3116d88d165b150",
        "user": "689f0089d4d1bb30228f04a3",
        "items": [
            {
                "product": {
                    "_id": "68a1d675a49f2842ec039646",
                    "name": "Sunset painting",
                    "description": "This is a beautiful painting of sunset in desert",
                    "image": "https://camo.githubusercontent.com/c2fd2f94aa55544327fc8ed8901aedb2eec8e3535243452b43646eb8086efe1a/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d34342e6a7067",
                    "price": 99.99,
                    "stock": 2,
                    "vendor": "68a1b7826067252088d23050",
                    "category": "woman",
                    "__v": 0
                },
                "vendor": {
                    "_id": "68a1b7826067252088d23050",
                    "name": "Vendor Account",
                    "email": "james@xyz.com",
                    "password": "$2b$10$Rhgjyqs5Q8MPjCcYfjMdAei0l2pw3R7ftUa5X//3uUfF/EilAlB/i",
                    "role": "vendor",
                    "createdAt": "1755424865368",
                    "__v": 0
                },
                "quantity": 2,
                "price": 100,
                "_id": "68a31c87c3116d88d165b151"
            }
        ],
        "shippingAddress": "12/24 Karol bagh Delhi-10006",
        "paymentMethod": "UPI",
        "paymentStatus": "refunded",
        "orderStatus": "cancelled",
        "totalAmount": 500,
        "createdAt": "2025-08-18T12:28:55.516Z",
        "updatedAt": "2025-08-19T13:26:18.539Z",
        "__v": 0
    },
    {
        "_id": "68a466a50d7b53071cb34bdf",
        "user": "689f0089d4d1bb30228f04a3",
        "items": [
            {
                "product": {
                    "_id": "68a4658b0d7b53071cb34bd9",
                    "name": "Oversized tshirt",
                    "description": "Oversized tshirt available for sale",
                    "image": "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=",
                    "price": 20,
                    "stock": 7,
                    "vendor": "68a1b7826067252088d23050",
                    "category": "mens",
                    "__v": 0
                },
                "vendor": {
                    "_id": "68a1b7826067252088d23050",
                    "name": "Vendor Account",
                    "email": "james@xyz.com",
                    "password": "$2b$10$Rhgjyqs5Q8MPjCcYfjMdAei0l2pw3R7ftUa5X//3uUfF/EilAlB/i",
                    "role": "vendor",
                    "createdAt": "1755424865368",
                    "__v": 0
                },
                "quantity": 1,
                "price": 2,
                "_id": "68a466a50d7b53071cb34be0"
            }
        ],
        "shippingAddress": "9 3/4 platform london",
        "paymentMethod": "UPI",
        "paymentStatus": "paid",
        "orderStatus": "delivered",
        "totalAmount": 2,
        "createdAt": "2025-08-19T11:57:25.545Z",
        "updatedAt": "2025-08-19T13:21:25.161Z",
        "__v": 0
    },
    {
        "_id": "68a4673b0d7b53071cb34be3",
        "user": "689f0089d4d1bb30228f04a3",
        "items": [
            {
                "product": {
                    "_id": "68a1d675a49f2842ec039646",
                    "name": "Sunset painting",
                    "description": "This is a beautiful painting of sunset in desert",
                    "image": "https://camo.githubusercontent.com/c2fd2f94aa55544327fc8ed8901aedb2eec8e3535243452b43646eb8086efe1a/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d34342e6a7067",
                    "price": 99.99,
                    "stock": 2,
                    "vendor": "68a1b7826067252088d23050",
                    "category": "woman",
                    "__v": 0
                },
                "vendor": {
                    "_id": "68a1b7826067252088d23050",
                    "name": "Vendor Account",
                    "email": "james@xyz.com",
                    "password": "$2b$10$Rhgjyqs5Q8MPjCcYfjMdAei0l2pw3R7ftUa5X//3uUfF/EilAlB/i",
                    "role": "vendor",
                    "createdAt": "1755424865368",
                    "__v": 0
                },
                "quantity": 1,
                "price": 100,
                "_id": "68a4673b0d7b53071cb34be4"
            },
            {
                "product": {
                    "_id": "68a4658b0d7b53071cb34bd9",
                    "name": "Oversized tshirt",
                    "description": "Oversized tshirt available for sale",
                    "image": "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=",
                    "price": 20,
                    "stock": 7,
                    "vendor": "68a1b7826067252088d23050",
                    "category": "mens",
                    "__v": 0
                },
                "vendor": {
                    "_id": "68a1b7826067252088d23050",
                    "name": "Vendor Account",
                    "email": "james@xyz.com",
                    "password": "$2b$10$Rhgjyqs5Q8MPjCcYfjMdAei0l2pw3R7ftUa5X//3uUfF/EilAlB/i",
                    "role": "vendor",
                    "createdAt": "1755424865368",
                    "__v": 0
                },
                "quantity": 1,
                "price": 2,
                "_id": "68a4673b0d7b53071cb34be5"
            }
        ],
        "shippingAddress": "Saya avenue",
        "paymentMethod": "UPI",
        "paymentStatus": "paid",
        "orderStatus": "delivered",
        "totalAmount": 102,
        "createdAt": "2025-08-19T11:59:55.643Z",
        "updatedAt": "2025-08-19T13:07:19.838Z",
        "__v": 0
    }
]

const processedData = data.map(order => {
  const { _id, orderStatus: status, items, shippingAddress, createdAt } = order;
  const orderData = items.map(item => ({
    id: _id,
    status,
    shippingAddress,
    amount: item.price * item.quantity,
    quantity: item.quantity,
    data: processCreatedAt(createdAt)
}))
return orderData
})
return processedData.flat();
}