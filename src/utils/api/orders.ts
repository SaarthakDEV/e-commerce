import myHttp from "@/config/axios.config"
import urls from "@/libs/urls"

export const changeOrderStatus = async (orderId: string) => {
    return await myHttp.get(`${urls.orders}/${orderId}/change-order-status`)
}

export const getOrderByVendor = async () => {
    return await myHttp.get(urls.orders_by_vendor)
}

export const cancelOrder = async (orderId: string) => {
    return await myHttp.get(`${urls.orders}/${orderId}/cancel-order`)
}

export const getCustomerOrder = async () => {
    return await myHttp.get(urls.orders);
}

export const createOrder = async (payload: any) => {
    return await myHttp.post(urls.orders, payload);
}

export const getOrderById = async (orderId: string) => {
    return await myHttp.get(`${urls.orders}/${orderId}`)
}