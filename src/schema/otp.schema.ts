import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    otp : {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
})


const otpModel = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

export default otpModel;