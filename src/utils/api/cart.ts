import myHttp from "@/config/axios.config"
import urls from "@/libs/urls"

export const getCartItems = async () => {
    return await myHttp.get(urls.cart)
}