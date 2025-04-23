import mongoose from "mongoose";

const json = {

    name: {
        type: String,
        required: true,
        unique: true
    },
    path:{
        type: String,
        required: true,
    },
    discription:{
        type: String,
        required: false,
    },
    imageUrl:{
        type:URL,
        required:false,
    }
}

const CategorySchema = new mongoose.Schema(json)

export default mongoose.model('Category', CategorySchema);