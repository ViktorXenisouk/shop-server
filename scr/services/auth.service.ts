import bcrypt from "bcrypt"
import UserModel from "../models/user.model"
import jsonwebtoken from "jsonwebtoken"

class AuthService {
 public async register(payload: { username: string, email: string, password: string }) {
        try {
            const { username, email, password } = payload
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const oldUser = await UserModel.findOne({ email: email })

            if (oldUser)
                return { success: false, status: 500, message: 'user already exist' }

            const doc = new UserModel({
                email: email,
                username: username,
                passwordHash: hash
            })

            const data = await doc.save();

            const token = jsonwebtoken.sign({ id: doc._id }, 'secret');

            const { passwordHash, ...userData } = data.toObject();

            return {
                success: true,
                status: 200,
                message: 'you are success connect',
                data: { user: userData, token: token }
            };
        } catch (err) {
            return {
                success: false,
                status: 500,
                message: 'cannot registration'
            };
        }
    }

    public async login(payload: { email: string, password: string }) {
        const { email, password } = payload
        try {
            const user = await UserModel.findOne({ email: email }).lean()

            if (!user)
                return { success: false, status: 404, message: 'user no found' }


            const isValidPass = await bcrypt.compare(password, user.passwordHash);

            if (!isValidPass)
                return { success: false, status: 400, message: 'no correct password' }

            const token = jsonwebtoken.sign({ id: user._id }, 'secret');

            const { passwordHash, ...userData } = user;

            return { success: true, status: 200, data: { token, user:userData }, message: '' }

        } catch (err) {
            return { success: false, status: 500, message: 'cannot auth' }
        }
    }

    public async isEmailAvailable(email: string) {
            try {
                const user = await UserModel.find({ email: email })
    
                const data = user ? false : true
                const message = user ? 'this email is not awiable' : 'email is Available'
                return { success: true, status: 200, data, message }
    
            }
            catch (err) {
                return { success: false, status: 500, message: err }
            }
        }

        public async getMe(id?: string) {
                try {
                    if (id) {
                        console.log(id);
                        const user = await UserModel.findById(id);
        
                        if (!user)
                            return {
                                success: false,
                                status: 404,
                                message: 'user no exist'
                            }
        
        
                        const { passwordHash, ...userData } = user.toObject();
        
                        return {
                            success: true,
                            status: 200,
                            data: {
                                userData,
                                userId: id,
                            },
                            message: 'good'
                        }
                    }
                    else {
                        return {
                            success: false,
                            status: 500,
                            message: 'some mistake with user token'
                        }
                    }
                } catch (err) {
                    console.log(err);
        
                    return {
                        success: true,
                        status: 500,
                        message: 'no entry',
                        errors: err
                    }
                }
            }
}

export {AuthService}