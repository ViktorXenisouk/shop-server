import AdminModel from "../models/Admin"
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { message } from "../types";

const login = async (name: string, password: string): Promise<message & { data?: { token: string, data: any } }> => {
    const user = await AdminModel.findOne({ name: name });

    if (!user) return { success: false, status: 404, message: 'user no found' }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPass) return { success: false, status: 400, message: 'no correct password' }

    const token = jsonwebtoken.sign({ id: user._id }, 'secret');

    const { passwordHash, ...userData } = user;

    return { success: true, status: 200, data: { token, data: userData } }
}

const create = async (name: string, email: string, password: string, imgUrl: string, lvl: number): Promise<message> => {
    const oldUser = await AdminModel.findOne({ name: name })

    if (oldUser) return {success:false,status:400,message:'user alredy exist'}

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const doc = new AdminModel({
        email: email,
        name: name,
        passwordHash: hash,
        imgUrl: imgUrl,
        securityLvl: lvl
    })

    doc.save();

    return {success:true,status:200}
}

export { login,create }