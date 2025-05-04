import { Schema } from "mongoose";
import mongoose from "mongoose";

const TagSchema = new Schema({
    name:String,
    tags: [String],
    isHor: Boolean,
}, { _id: false });

const CategorySchema = new Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    fullPath: { type: String, required: true, unique: true },
    parentPath: { type: String },
    discription: String,
    imgUrl: String,
    tags: { type: Map, of: TagSchema },
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Category", CategorySchema);