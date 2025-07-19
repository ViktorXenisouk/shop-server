import { RequestHandler } from "express";
import { UserService } from "../services/user.service";

class UserController {
    constructor(private userService: UserService) { }

    public getById: RequestHandler = async (req, res) => {
        const id = req.params.id
        const { status, ...other } = await this.userService.getById(id)

        res.status(status).json({ ...other })
    }

    public editMe: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : undefined
        const payload = req.body

        const { status, ...other } = await this.userService.editMe(payload, id)

        res.status(status).json({ ...other })
    }

    public setBlocked: RequestHandler = async (req, res) => {
        const { id, blocked } = req.body

        const { status, ...other } = await this.userService.setBlocked(id, blocked)

        res.status(status).json({ ...other })
    }

    public remove: RequestHandler = async (req, res) => {
        const { id } = req.params

        const { status, ...other } = await this.userService.remove(id)

        res.status(status).json({ ...other })
    }

    public edit: RequestHandler = async (req, res) => {
        const payload = req.body
        const id = req.params.id

        const { status, ...other } = await this.userService.edit(id, payload)

        res.status(status).json({ ...other })
    }

    public find: RequestHandler = async (req, res) => {
        const payback = req.query

        const { status, ...other } = await this.userService.find(payback)

        res.status(status).json({ ...other })
    }
}

export {UserController}