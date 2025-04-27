import mongoose from "mongoose";

const json = {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    basketInfo: {
        required: false,
        type: [{id:String,count:Number}]
    },
    favourite:{
        required:false,
        type:[String]
    },
    level:{
        type:Number,
        required:false,
        default:0,
    }
}

const UserSchema = new mongoose.Schema(json,
    {
        timestamps: true
    })

export default mongoose.model('User', UserSchema);