import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { Request,Response,NextFunction } from 'express';
import AdminModel from '../models/admin.model'

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
        const id = decoded.id
        const admin = await AdminModel.findById(id);
        if (admin && admin.securityLvl > 0) {
            req.level = admin.securityLvl;
            req.userId = id;
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
        return {
            level:-1,
            success: false,
            message: "error"
        }
    }
}

const checkAdminLevel = async (req:Request&any, res:Response, next:NextFunction,lvl:number): Promise<void> => {
    const result = await getAdminLevel(req)
    
    if(result.success && result.level>=lvl){
        next()
        return
    }
    else{
        res.status(403).json({message:result.message})
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