import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 10
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        enum: ['mens', 'woman', 'kids'],
        required: true,
    },
})

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;