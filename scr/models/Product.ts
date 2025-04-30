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
        type: [String],
        required: true,
    },
    paths: {
        type: [String],
        required: true
    },
    imgs:{
        type:[String],
        required:false
    }
}

const ProductSchema = new mongoose.Schema(json)

export default mongoose.model('Product', ProductSchema);