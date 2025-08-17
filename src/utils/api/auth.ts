import myHttp from "@/config/axios.config";
import urls from "@/libs/urls";

export const getUserInfo = async () => { 
    return await myHttp.get(urls.me);
}

export const logout = async () => { 
    return await myHttp.get(urls.logout);
}
