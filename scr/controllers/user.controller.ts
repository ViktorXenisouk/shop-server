import { RequestHandler } from "express";
import { UserService } from "../services/user.service";

class UserController {
    constructor(private userService: UserService) { }

    public GetById: RequestHandler = async (req, res) => {
        const id = req.params.id
        const { status, ...other } = await this.userService.GetById(id)

        res.status(status).json({ ...other })
    }

    public EditMe: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : undefined
        const payload = req.body

        const { status, ...other } = await this.userService.EditMe(payload, id)

        res.status(status).json({ ...other })
    }

    public SetBlocked: RequestHandler = async (req, res) => {
        const { id, blocked } = req.body

        const { status, ...other } = await this.userService.SetBlocked(id, blocked)

        res.status(status).json({ ...other })
    }

    public Delete: RequestHandler = async (req, res) => {
        const { id } = req.params

        const { status, ...other } = await this.userService.Delete(id)

        res.status(status).json({ ...other })
    }

    public Edit: RequestHandler = async (req, res) => {
        const payload = req.body
        const id = req.params.id

        const { status, ...other } = await this.userService.Edit(id, payload)

        res.status(status).json({ ...other })
    }

    public Find: RequestHandler = async (req, res) => {
        const payback = req.query

        const { status, ...other } = await this.userService.Find(payback)

        res.status(status).json({ ...other })
    }
}

export {UserController}