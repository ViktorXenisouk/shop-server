import { Schema } from "mongoose";
import mongoose from "mongoose";

const TagSchema = new Schema({
    tags: {type:[String]},
    type:{type:String},
}, { _id: false });

const CategorySchema = new Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    fullPath: { type: String, required: true, unique: true },
    parentPath: { type: String },
    discription: {type:String},
    imgUrl:{type:String},
    tags: { type: Map, of: TagSchema },
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Category", CategorySchema);