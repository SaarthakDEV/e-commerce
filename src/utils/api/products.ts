import myHttp from "@/config/axios.config"
import urls from "@/libs/urls"

export const getVendorProducts = async () => {
    return await myHttp.get(urls.vendor_products);
}

export const postProduct = async (formData: any) => {
    return await myHttp.post(urls.products, formData)
}