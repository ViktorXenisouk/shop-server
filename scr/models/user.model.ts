import mongoose, { model } from "mongoose";
import { IUser } from "../types/user.type"

const UserSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true, // чтобы не было повторов
            lowercase: true, // автоматическое преобразование к нижнему регистру
            trim: true, // удаляет лишние пробелы
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // простая проверка email
        },
        passwordHash: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: false,
            match: /^\+?[0-9\s\-()]{7,20}$/,
        },
        basketInfo: {
            required: false,
            type: [{ id: String, count: Number }]
        },
        favourite: {
            required: false,
            type: [String]
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    })

export default model('User', UserSchema);