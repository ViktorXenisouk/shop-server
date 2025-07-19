import bcrypt from "bcrypt"
import UserModel from "../models/user.model"

class UserService {
    public async getById(id: string) {
        try {
            const user = await UserModel.findById(id).lean()
            if (!user) {
                return { success: false, status: 404, message: 'no find' }
            }

            return { success: true, status: 200, message: 'goood', data: user }
        }
        catch (err) {
            return { success: false, status: 500, message: 'some error' }
        }
    }

    public async editMe(payload: { username: string, email: string, password: string }, id?: string) {
        try {
            if (id) {
                const user = await UserModel.findById(id);

                if (!user)
                    return {
                        success: false,
                        status: 404,
                        message: 'user no exist'
                    }


                const { username, email, password } = payload

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
                await user.save()

                return {
                    success: true,
                    status: 200,
                    message: 'it is edited'
                }
            }
            else {
                return {
                    success: false,
                    status: 500,
                    message: 'some mistake with user ID'
                }
            }

        }
        catch (err) {
            return {
                success:false,
                status:500,
                message: 'no entry',
                errors: err
            }
        }
    }

    public async setBlocked (id:string,blocked:boolean) {
         try {        
                const user = await UserModel.findById(id);
        
                if (!user) return {success:false,status:404,message:'user no find'}
                
                user.isBlocked = blocked
        
                await user.save()
        
                return { success:true,status:200,message: `user ${user.username} is ${user.isBlocked}` }
            }
            catch (err) {
                return { success:false,status:500,message: err || 'some error' }
            }
    }

    public async remove (id:string) {
         try {        
                const user = await UserModel.findByIdAndDelete(id);
        
                if (!user) return {success:false,status:404,message:'user no found'}
        
                return {
                    success:true,
                    status:200,
                    message:'user successfuly delete'
                }
            }
            catch (err) {
                return {
                    success:true,
                    status:500,
                    message: err || "some error",
                }
            }
    }

    public async edit (id:string,payload:{username:string,email:string,password:string}) {
         try {

            const user = await UserModel.findById(id);
        
                if (!user) 
                    return {
                        success:false,
                        status:404,
                        message:'user no found'
                    }
                
                const { username, email, password } = payload
        
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

                await user.save()

                return {success:true,status:200,message:'user successfuly edit'}
            }
            catch (err) {
                return {success:false,status:500,message: err || 'some error'}
            }
    }

    public async find(payback:{search?:string,isBlocked?:boolean}){
        try {        
                const filter = {} as any
        
                if (payback.search) {
                    filter.username = { $regex: payback.search, $options: "i" }
                    filter.email = { $regex: payback.search, $options: "i" }
                }
                if (payback.isBlocked) filter.isBlocked = payback.isBlocked ? { $eq: true } : { $or: [{ $exists: false }, { $eq: false }] }
        
                const users = await UserModel.find(filter).lean()
        
                return {success:true,status:200,data:users,message:'users are found'}
            }
            catch (err){
                return {success:false,status:500,message:err||'some error on server'}
            }
    }
}

export {UserService}