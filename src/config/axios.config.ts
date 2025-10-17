import { getAuthHeader } from "@/utils/helpers";
import axios from "axios";

const myHttp = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

myHttp.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAuthHeader()}`
    return config
})

myHttp.interceptors.response.use(
    (response) => response, 
  (error) => {
    if (error.response && error.response.status === 403) {
      console.log("You are not authorized to perform this action");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
)

export default myHttp;