import { RequestHandler } from "express"
import { AuthService } from "../services/auth.service"

class AuthController {
    constructor (private authService:AuthService){}
        public register: RequestHandler = async (req, res) => {
            const payload = req.body
            const { status, ...other } = await this.authService.register(payload)
    
            res.status(status).json({ ...other })
        }
    
        public login: RequestHandler = async (req, res) => {
            const payload = req.body
    
            const { status, ...other } = await this.authService.login(payload)
    
            res.status(status).json({ ...other })
        }
    
        public isEmailAvailable: RequestHandler = async (req, res) => {
            const email = req.body.email
    
            const { status, ...other } = await this.authService.isEmailAvailable(email)
    
            res.status(status).json({ ...other })
        }
    
        public getMe: RequestHandler = async (req, res) => {
            const id = 'userId' in req ? req.userId as string : undefined
    
            const { status, ...other } = await this.authService.getMe(id)
    
            res.status(status).json({ ...other })
        }
}

export {AuthController}