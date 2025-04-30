import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { Request,Response,NextFunction } from 'express';
import AdminModel from '../models/Admin'

const getAdminLevel = async (req: Request & any): Promise<{ success: boolean, level: number,message?: string, id?: string }> => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (!token) {
        return {
            level:-1,
            success: false,
            message: 'no entry'
        };
    }
    try {
        const decoded = jwt.verify(token, 'secret') as { id: string };
        const admin = await AdminModel.findById(req.userId);
        if (admin && admin.securityLvl > 0) {
            req.level = admin.securityLvl;
            req.userId = decoded.id;
            return {
                success: true,
                level: admin.securityLvl,
                id: admin.id,
            }
        }
        else {
            return {
                level:-1,
                success: false,
                message: 'cant find user as admin'
            }
        }
    } catch (err) {
        console.log(err);
        return {
            level:-1,
            success: false,
            message: "error"
        }
    }
}

const checkAdminLevel = async (req:Request&any, res:Response, next:NextFunction,lvl:number): Promise<void> => {
    const result = await getAdminLevel(req)
    // remove
    if(true){
        req.userId = result.id;
        next()
        return
    }
    return;
    // remove
    if(result.success && result.level>=lvl){
        req.userId = result.id;
        next()
        return
    }
    else{
        res.status(400).json({success:false,message:result.message})
    }
}

const checkIsAdminLvl1: RequestHandler = async (req:Request&any, res, next): Promise<any> => {
    await checkAdminLevel(req,res,next,1)
}
const checkIsAdminLvl2: RequestHandler = async (req:Request&any, res, next): Promise<any> => {
    await checkAdminLevel(req,res,next,2)
}
const checkIsAdminLvl3: RequestHandler = async (req:Request&any, res, next): Promise<any> => {
    await checkAdminLevel(req,res,next,3)
}
export { checkIsAdminLvl1,checkIsAdminLvl2,checkIsAdminLvl3 }