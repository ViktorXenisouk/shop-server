import { RequestHandler } from "express";
import bcrypt from "bcrypt"
import UserModel from "../models/User"
import jsonwebtoken from "jsonwebtoken"
import { Request } from "express";

const register: RequestHandler = async (req, res): Promise<any> => {
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
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email: email }).select(['id', 'passwordHash']);

        if (!user) {
            return res.status(404).json({
                message: 'user no found'
            })
        }

        const isValidPass = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'no correct password'
            })
        }

        const token = jsonwebtoken.sign({ id: user._id }, 'secret');

        const { passwordHash, ...userData } = user;

        return res.json({
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

const editMe: RequestHandler = async (req: Request & any, res): Promise<any> => {
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

const setIsBlocked: RequestHandler = async (req, res): Promise<any> => {
    try {
        const { id, blocked } = req.body

        const user = await UserModel.findById(id);

        if (!user) return res.status(404).json({ message: 'user no found' })

        user.isBlocked = blocked

        await user.save()

        res.status(200).json({ message: `user ${user.username} is ${user.isBlocked}` })
    }
    catch (err) {
        res.status(500).json({ message: 'some error' })
    }
}

const remove: RequestHandler = async (req: Request & any, res): Promise<any> => {
    try {
        const { id } = req.params

        const user = await UserModel.findByIdAndDelete(id);

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

const edit: RequestHandler = async (req: Request & any, res): Promise<any> => {
    try {
        const { username, email, password, id } = req.body
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'user no exist'
            })
        }


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
    catch (err) {
        return res.status(500).json({
            message: 'no entry',
            errors: err
        })
    }
}

const getAll: RequestHandler = async (req, res) => {
    try {
        const users = await UserModel.find().select(['username', 'email', 'id']);

        res.status(200).json({ data: users })
    }
    catch {
        res.status(500).json({ message: 'no works' })
    }
}

export { register, login, getMe, editMe, setIsBlocked, remove, edit,getAll}