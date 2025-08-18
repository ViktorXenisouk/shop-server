import mongoose from "mongoose";
import { Admin } from "../types/admin.type";

const AdminModel = new mongoose.Schema<Admin>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        discription: {
            type: String,
            required: false,
        },
        securityLvl: {
            type: Number,
            required: true
        },
        imgUrl: {
            type: String,
            required: false,
        },
        isMain: {
            type: Boolean,
            default: false
        }
    }
)

export default mongoose.model('Admin', AdminModel);