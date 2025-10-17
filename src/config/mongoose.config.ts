import mongoose from "mongoose";

export const connectToMongo = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_URL as string);
    }catch(err){

    }
}