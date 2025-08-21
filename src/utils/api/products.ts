import myHttp from "@/config/axios.config"
import urls from "@/libs/urls"

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