import { RequestHandler } from "express";
import AdminModel from "../models/Admin"
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const login: RequestHandler = async (req, res): Promise<any> => {
    try {
        const user = await AdminModel.findOne({ name: req.body.name });

        if (!user) {
            return res.status(404).json({
                message: 'user no found'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'no correct password'
            })
        }

        const token = jsonwebtoken.sign({ id: user._id }, 'secret');

        const { passwordHash, ...userData } = user;

        return res.json({
            ...userData,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'can not auth'
        });
    }
};

const createAdmin: RequestHandler = async (req, res): Promise<any> => {
    try {
        const { name, email, password, imgUrl, lvl } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const oldUser = await AdminModel.findOne({ name: name })

        if (oldUser) {
            res.status(400).json({ message: 'user alredy exist' })
            return
        }

        const doc = new AdminModel({
            email: email,
            name: name,
            passwordHash: hash,
            imgUrl: imgUrl,
            securityLvl: lvl
        })

        doc.save();

        const token = jsonwebtoken.sign({ id: doc._id }, 'secret');

        const { passwordHash, ...userData } = doc;

        return res.json({
            ...userData,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'cannot registration'
        });
    }
};

const updateMe: RequestHandler = async (req: Request & any, res) : Promise<any> => {
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

const remove : RequestHandler = async (req: Request & any, res) : Promise<any> => {

}

export { login, createAdmin, }