import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { Request } from 'express';

const checkAuth: RequestHandler = (req: Request & any, res, next): any => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'no entry'
        });
    }

    try {
        const decoded = jwt.verify(token, 'secret') as {id:string};

        req.userId = decoded.id;

        next();
    } catch (err) {
        console.log(err);

        return res.status(403).json({
            success: false,
            message: 'error'
        })
    }
}

export { checkAuth }