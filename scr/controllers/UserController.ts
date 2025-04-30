import { RequestHandler } from "express";
import bcrypt from "bcrypt"
import UserModel from "../models/User"
import jsonwebtoken from "jsonwebtoken"
import { validationResult, body } from 'express-validator';
import { Request } from "express";

const register: RequestHandler = async (req, res): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const { username, email, password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const oldUser = await UserModel.findOne({ email: email })

        if (oldUser) {
            res.status(500).json({ message: 'user alredy exist' })
            return
        }

        const doc = new UserModel({
            email: email,
            username: username,
            passwordHash: hash
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
        return res.status(500).json({
            message: 'cannot registration'
        });
    }
};

const login: RequestHandler = async (req, res): Promise<any> => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

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

const getMe: RequestHandler = async (req: Request & any, res): Promise<any> => {
    try {
        if (req.userId) {
            console.log(req.userId);
            const user = await UserModel.findById(req.userId);

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

const updateMe: RequestHandler = async (req: Request & any, res): Promise<any> => {
    try {
        if (req.userId) {
            const user = await UserModel.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    message: 'user no exist'
                })
            }

            const { username, email, password } = req.body

            if (username) user.username = username;
            if (email) {
                const u = await UserModel.find({ email: email })
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

const setIsBlocked: RequestHandler = (req, res) => {
    try {

    }
    catch (err) {

    }
}



export { register, login, getMe, updateMe }