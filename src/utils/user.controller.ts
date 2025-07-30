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