import mongoose,{model} from "mongoose";
import { IProduct, IContentBlock } from "../types/product";

type D = { [name: string]: { [tagName: string]: any; } }

const ParametersSchema = new mongoose.Schema({
    data: {
        type: Map,
        of: {
            type: Map,
            of: String
        }
    }
});

const ContentBlockSchema = new mongoose.Schema<IContentBlock>(
    {
        type: { type: String, required: true },
        title: { type: String },
        variant: { type: String },
        text: { type: String },
        image: { type: String },
    },
    { _id: false }
);

const ProductSchema = new mongoose.Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        discription: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            required: true
        },
        imgs: {
            type: [{ name: String, url: String }],
            default: []
        },
        price: {
            type: Number,
            default: 0,
        },
        superTag: {
            type: String,
            enum: ['best', 'value', 'popular', 'new'],
            default: null,
        },
        numberOfProductsSold: {
            type: Number,
            default: 0,
        },
        similarProductIds: {
            type: [mongoose.Schema.ObjectId],
            default: []
        },
        comments: {
            type: [{ id: mongoose.Schema.ObjectId, text: String, rate: Number }],
            default: [],
        },
        blocks: {
            type: [{ type: ContentBlockSchema }],
            required: false
        },
        parameters: { type: ParametersSchema, required: false },
        media: {
            type: [{ type: String, url: String }],
            default: []
        }
    },
    {
        timestamps: {
            createdAt: true, updatedAt: false
        },
    })

export default model('Product', ProductSchema);