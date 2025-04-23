import mongoose from "mongoose";

const json = {

    name: {
        type: String,
        required: true,
        unique: true
    },
    discription:{
        type: String,
        required: true,
    },
    tags:{
        type: Array<String>,
        required: true,
    },
    paths: {
        type: Array<String>,
        required: true
    },
}

const ProductSchema = new mongoose.Schema(json)

export default mongoose.model('Product', ProductSchema);