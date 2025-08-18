import { Schema } from "mongoose";
import mongoose from "mongoose";
import { ICategory, IFilter } from "../types/category.type";

const FilterItem = new Schema<IFilter>(
    {
        variant: { type: String, enum: ['number', 'min-max', 'tags-horizontal', 'tags-vertical'] },
        props: { type: Map }
    },
    {
        _id: false
    })

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
        path: { type: String, required: true },
        fullPath: { type: String, required: true, unique: true },
        parentPath: { type: String },
        discription: { type: String },
        imgUrl: { type: String },
        filter: { type: Map, of: FilterItem },
        isDeleted: { type: Boolean, default: false },
    });

export default mongoose.model("Category", CategorySchema);