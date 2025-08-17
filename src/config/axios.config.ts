import { getAuthHeader } from "@/utils/helpers";
import axios from "axios";
import toast from "react-hot-toast";


const baseUrl = "http://localhost:3000/api";

const myHttp = axios.create({
    baseURL: baseUrl
})

myHttp.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAuthHeader()}`
    return config
})

myHttp.interceptors.response.use(
    (response) => response, // pass successful responses through
  (error) => {
    if (error.response && error.response.status === 403) {
      // Perform your task here
      console.log("You are not authorized to perform this action");

      // Example: redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error); // rethrow error so calling code can also handle it
  }
)

export default myHttp;