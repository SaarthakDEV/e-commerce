import mongoose, { Connection } from "mongoose";

const cachedConnection: Connection | null = null;

export const connectToMongo = async () => {
    try{
        if(cachedConnection){
            console.log("Using cached db connection");
            return cachedConnection;
        }
        await mongoose.connect(process.env.DB_CONNECTION_URL as string);
        console.log("New mongodb connection established");
    }catch(err){

    }
}