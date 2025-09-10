import myHttp from "@/config/axios.config"
import urls from "@/libs/urls"
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";

export const getVendorProducts = async () => {
    return await myHttp.get(urls.vendor_products);
}

export const postProduct = async (formData: any) => {
    return await myHttp.post(urls.products, formData)
}

export const getReviews = async (productId: string) => {
    return await myHttp.get(`${urls.products}/${productId}/reviews`)
}

export const getAllProducts = async (category: string) => {
    return await myHttp.get(urls.products, {
        params: {
            category
        }
    })
}

export const updateProduct = async (formData: any, productId: string) => {
    return await myHttp.patch(`${urls.products}/${productId}`, formData)
}

export const getProductDetail = async (productId: string) => {
    return await myHttp.get(`${urls.products}/${productId}`);
}

export const postReview = async (productId: string, payload: {message: string, image: string | null}) => {
    return await myHttp.post(`${urls.products}/${productId}/reviews`, payload);
}

export const postReviewReply = async (productId: string, reviewId: string, payload: {image: string | null, message: string}) => {
    return await myHttp.post(`${urls.products}/${productId}/reviews/${reviewId}`, payload)
}

export const deleteReview = async (productId: string, reviewId: string) => {
    return await myHttp.get(`${urls.products}/${productId}/reviews/${reviewId}`)
}