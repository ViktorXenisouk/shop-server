import mongoose from "mongoose";
import { AllowedRequests } from "../types/allowed-requests.type";

const AllowedRequestsSchema = new mongoose.Schema<AllowedRequests>(
    {
        name: {
            type: String,
        },
        url: {
            type: String,
            requred: true
        },
        icon: {
            type: String, required: false
        },
        type: {
            type: String, default: 'product', enum: ['product', 'category', 'article']
        },
        isAutoCreated: {
            type: Boolean, default: true,
        }
    },
    {
        timestamps: false,
        id: true
    })

export default mongoose.model('AllowedRequests', AllowedRequestsSchema);