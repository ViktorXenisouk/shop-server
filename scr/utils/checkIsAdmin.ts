import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { Request } from 'express';
import UserModel from '../models/User'

const checkIsAdmin: RequestHandler = async (req: Request & any, res, next): Promise<any> => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'no entry'
        });
    }

    try {
        const decoded = jwt.verify(token, 'secret') as { id: string };
        const user = await UserModel.findById(req.userId);
        if (user && user.level>0) {
            req.level = user.level;
            req.userId = decoded.id;
            next();
        }
        else{
            return res.status(403).json({
                success: false,
                message: 'cant find user as admin'
            })
        }
    } catch (err) {
        console.log(err);

        return res.status(403).json({
            success: false,
            message: 'error'
        })
    }
}

export { checkIsAdmin }