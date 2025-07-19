import AdminModel from "../models/admin.model"
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

class AdminService {
    public async login(name: string, password: string) {
        const admin = await AdminModel.findOne({ name: name });

        if (!admin) return { success: false, status: 404, message: 'user no found' }

        const isValidPass = await bcrypt.compare(password, admin.passwordHash);

        if (!isValidPass) return { success: false, status: 400, message: 'no correct password' }

        const token = jsonwebtoken.sign({ id: admin._id }, 'secret');

        return { success: true, status: 200, data: { token, admin } }
    }

    public async create(payload: { name: string, email: string, password: string, imgUrl: string, lvl: number }) {
        const { name, email, password, imgUrl, lvl } = payload

        const oldUser = await AdminModel.findOne({ name: name })

        if (oldUser) return { success: false, status: 400, message: 'user alredy exist' }

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

        return { success: true, status: 200 }
    }

    public async getById(id: string) {
        try {
            const admin = await AdminModel.findById(id).lean()

            if (!admin) {
                return { success: false, status: 404, message: 'no found' }
            }

            return { success: true, status: 200, message: 'done', data: admin }
        }
        catch (err) {
            return { success: false, status: 500, message: err || 'server error' }
        }
    }

    public async find(payback: { search?: string }) {
        try {
            const filter = {} as any

            if (payback.search) {
                filter.name = { $regex: payback.search, $options: "i" }
                filter.discription = { $regex: payback.search, $options: "i" }
                filter.email = { $regex: payback.search, $options: "i" }
            }

            const admins = await AdminModel.find(payback).lean()

            return { success: true, status: 200, message: 'done', data: admins }
        }
        catch (err) {
            return { success: false, status: 500, message: err || 'server error' }
        }
    }

    private async editAdmin(id: string, payload: { name?: string, email?: string, password?: string, securityLvl?: number }, editLvl: boolean = false) {
        try {
            const admin = await AdminModel.findById(id)

            if (!admin) {
                return { success: false, status: 404, message: 'admin no found' }
            }
            const { name, email, password, securityLvl } = payload

            if (name) admin.name = name;
            if (email) {
                admin.email = email
            }
            if (password) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                admin.passwordHash = hash;
            }
            if (securityLvl && editLvl) admin.securityLvl = securityLvl

            await admin.save()

            return { success: true, status: 200, message: 'done' }
        }
        catch (err) {
            return { success: false, status: 500, message: err || 'server error' }
        }
    }

    public async editByAdmin(id: string, payload: { name?: string, email?: string, password?: string, securityLvl?: number }) {
        return await this.editAdmin(id, payload, true)
    }

    public async editMe(id: string, payload: { name?: string, email?: string, password?: string, securityLvl?: number }) {
        return await this.editAdmin(id, payload, false)
    }

    public async remove(id: string) {
        try {
            const user = await AdminModel.findByIdAndDelete(id);

            if (!user) return { success: false, status: 404, message: 'admin no found' }

            return { success: true, status: 200, message: 'done' }
        }
        catch (err) {
            return { success: false, status: 500, message: err || 'server error' }
        }
    }

    public async getMe(id?: string) {
        try {
            if (id) {
                const user = await AdminModel.findById(id).lean();

                if (!user) {
                    return { success: false, status: 404, message: 'no found' }
                }

                const { passwordHash, ...data } = user;

                return {
                    success: true,
                    status: 200,
                    data: data,
                    message: 'ok'
                }
            }
            else {
                return {
                    success: false, status: 300, message: 'some mistake with user ID'
                }
            }
        } catch (err) {
            return { success: false, status: 500, message: err || 'server error' }
        }
    }
}

export { AdminService }