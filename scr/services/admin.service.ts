import AdminModel from "../models/admin.model"
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

class AdminService {
    public async GetById(id: string) {
        try {
            const admin = await AdminModel.findById(id).lean()

            if (!admin) {
                return {
                    status: 404,
                    message: 'no found'
                }
            }

            return {
                status: 200,
                message: 'done',
                data: admin
            }
        }
        catch (err) {
            console.error(err)
            return { status: 500, message:'server error' }
        }
    }

    public async Login(name: string, password: string) {
        try {
            const admin = await AdminModel.findOne({ name: name });

            if (!admin) return { status: 404, message: 'user no found' }

            const isValidPass = await bcrypt.compare(password, admin.passwordHash);

            if (!isValidPass) return { status: 401, message: 'no correct password' }

            const token = jsonwebtoken.sign({ id: admin._id }, 'secret');

            return { status: 200, data: { token, admin } }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'error during admin login'
            }
        }
    }

    public async Create(payload: { name: string, email: string, password: string, imgUrl: string, securityLvl: number }) {
        try {
            const { name, email, password, imgUrl, securityLvl } = payload

            const oldUser = await AdminModel.findOne({ name: name })

            if (oldUser) return {
                status: 409,
                message: 'user with this name alredy exist'
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const doc = new AdminModel({
                email: email,
                name: name,
                passwordHash: hash,
                imgUrl: imgUrl,
                securityLvl: securityLvl
            })

            doc.save();

            return {
                status: 201,
                message: 'user successfuly created'
            }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'error during admin create'
            }
        }
    }

    public async Find(payback: { search?: string }) {
        try {
            const filter = {} as any

            if (payback.search) {
                filter.name = { $regex: payback.search, $options: "i" }
                filter.discription = { $regex: payback.search, $options: "i" }
                filter.email = { $regex: payback.search, $options: "i" }
            }

            const admins = await AdminModel.find(payback).lean()

            return {
                status: 200,
                message: `find ${admins.length} results`,
                data: admins
            }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'error during search admins'
            }
        }
    }

    private async editAdmin(id: string, payload: { name?: string, email?: string, password?: string, securityLvl?: number }, editLvl: boolean = false) {
        try {
            const admin = await AdminModel.findById(id)

            if (!admin) {
                return {
                    status: 404,
                    message: 'admin no found'
                }
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

            return {
                status: 200,
                data: admin,
                message: 'admin successfuly edited'
            }
        }
        catch (err) {
            console.error(err)
            return { 
                status: 500, 
                message: 'problem during editing admin' 
            }
        }
    }

    public async EditByAdmin(id: string, payload: { name?: string, email?: string, password?: string, securityLvl?: number }) {
        return await this.editAdmin(id, payload, true)
    }

    public async EditMe(id: string, payload: { name?: string, email?: string, password?: string }) {
        return await this.editAdmin(id, payload, false)
    }

    public async Delete(id: string) {
        try {
            const user = await AdminModel.findByIdAndDelete(id);

            if (!user) return { 
                status: 404, 
                message: 'admin no found' 
            }

            return { 
                status: 201, 
                message: 'user succeessfully deleted'
            }
        }
        catch (err) {
            console.error(err)
            return { 
                status: 500, 
                message: 'error during delete'
            }
        }
    }

    public async GetMe(id?: string) {
        try {
            if (id) {
                const me = await AdminModel.findById(id).lean();

                if (!me) {
                    return { 
                        status: 404, 
                        message: 'no found' 
                    }
                }

                const { passwordHash, ...data } = me;

                return {
                    status: 200,
                    data: data,
                    message: 'ok'
                }
            }
            else {
                return {
                    status: 403,
                    message: 'no access'
                }
            }
        } catch (err) {
            console.error(err)
            return { 
                status: 500, 
                message: 'error during getting info about yourself' 
            }
        }
    }
}

export { AdminService }