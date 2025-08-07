import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    image: {
        type: String,
    },
    reply: [
        {
            message: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            image: {
                type: String
            },
            time: {
                type: String,
                default: new Date().toLocaleString()
            }
        }
    ]
}, {
    timestamps: true
})

const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default reviewModel