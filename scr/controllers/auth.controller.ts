import { RequestHandler } from "express"
import { AuthService } from "../services/auth.service"

class AuthController {
    constructor(private authService: AuthService) { }
    
    public Register: RequestHandler = async (req, res) => {
        const payload = req.body
        const { status, ...other } = await this.authService.Register(payload)

        res.status(status).json({ ...other })
    }

    public Login: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.authService.Login(payload)

        res.status(status).json({ ...other })
    }

    public IsEmailAvailable: RequestHandler = async (req, res) => {
        const email = req.body.email

        const { status, ...other } = await this.authService.IsEmailAvailable(email)

        res.status(status).json({ ...other })
    }

    public GetMe: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : undefined

        const { status, ...other } = await this.authService.GetMe(id)

        res.status(status).json({ ...other })
    }
}

export { AuthController }