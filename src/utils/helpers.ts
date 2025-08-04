import { NextRequest } from "next/server";

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
