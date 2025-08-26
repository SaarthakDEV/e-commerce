import myHttp from "@/config/axios.config"
import urls from "@/libs/urls"

export const getCartItems = async () => {
    return await myHttp.get(urls.cart)
}

export const updateCartItem = async (id: string, action: string) => {
    return await myHttp.patch(`${urls.cart}/${id}`, null ,{ 
        params: {
            action
        }
    })
}

export const deleteCartItem = async (id: string) => {
    return await myHttp.delete(`${urls.cart}/${id}`)
}