import mongoose from "mongoose";

const json = {

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
        type:Number,
        required:true
    },
    imgUrl: {
        type: URL,
        required: false,
    },
    isMain:{
        type:Boolean,
        default:false
    }
}

const AdminModel = new mongoose.Schema(json)

export default mongoose.model('Admin', AdminModel);