import mongoose from "mongoose";

// types = product categorie text

const json = {
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
        type: String, default: 'product'
    },
    isAutoCreated: {
        type: Boolean, default: true,
    }
}

const AllowedRequestsSchema = new mongoose.Schema(json,
    {
        timestamps: false,
        id: true
    })

export default mongoose.model('AllowedRequests', AllowedRequestsSchema);