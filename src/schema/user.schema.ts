import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["customer", "vendor", "admin"],
        default: "customer"
    },
    createdAt: {
        type: String,
        default: + new Date()
    }
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;