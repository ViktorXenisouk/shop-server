import { RequestHandler } from "express";
import AdminModel from "../models/Admin"
import bcrypt from 'bcrypt';
import * as Service from "../services/adminService";

const login: RequestHandler = async (req, res): Promise<any> => {
    try {
        const { name, password } = req.body
        const { status, success, message, data } = await Service.login(name, password)

        return res.status(status).json({ success, message, data });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'can not auth'
        });
    }
};

const create: RequestHandler = async (req, res): Promise<any> => {
    try {
        const { name, email, password, imgUrl, lvl } = req.body
        
        const {status,success,message} = await Service.create(name,email,password,imgUrl,lvl)

        return res.status(status).json({success,message})

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'cannot registration'
        });
    }
};

const editMe: RequestHandler = async (req: Request & any, res): Promise<any> => {
    try {
        if (req.userId) {
            const user = await AdminModel.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    message: 'user no exist'
                })
            }

            const { name, email, password } = req.body

            if (name) user.name = name;
            if (email) {
                const u = await AdminModel.find({ email: email })
                if (!u) {
                    user.email = email
                }
            }
            if (password) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                user.passwordHash = hash;
            }
            user.save()
        }
        else {
            return res.status(500).json({
                message: 'some mistake with user ID'
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            message: 'no entry',
            errors: err
        })
    }
}

const remove: RequestHandler = async (req: Request & any, res): Promise<any> => {
    try {
        const { id } = req.params

        const user = await AdminModel.findByIdAndDelete(id);

        if (!user) return res.status(400).json({ success: false, message: 'no good' })

        res.status(200).json({ success: true, message: 'good' })
    }
    catch (err) {
        return res.status(500).json({
            message: 'no entry',
            errors: err
        })
    }
}

const getMe: RequestHandler = async (req: Request & any, res): Promise<any> => {
    try {
        if (req.userId) {
            const user = await AdminModel.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    message: 'user no exist'
                })
            }

            const { passwordHash, ...userData } = user;

            return res.json({
                userData,
                userId: req.userId,
            });
        }
        else {
            return res.status(500).json({
                message: 'some mistake with user ID'
            })
        }
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: 'no entry',
            errors: err
        })
    }
};
export { login, create, editMe, remove, getMe }