import { User } from "@/libs/types";
import userModel from "@/schema/user.schema"

export const getAll = async () => {
    try{
        const users = await userModel.find();
        return users;
    }catch(e){
        console.log(e)
        return [];
    }
}

export const findUserByEmail = async (email : string) => {
    try{
        const users = await getAll();
        const isUserExist: User | undefined = users.find(user => user.email === email);
        return isUserExist;
    }catch(e){
        console.log(e)
        return null;
    }
}