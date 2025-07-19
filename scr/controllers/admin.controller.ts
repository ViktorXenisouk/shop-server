import { RequestHandler } from "express";
import { AdminService } from "../services/admin.service";

class AdminController {
    constructor(private adminService: AdminService) { }

    public getById: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.adminService.getById(id)

        res.status(status).json({ ...other })
    }

    public find: RequestHandler = async (req, res) => {
        const payback = req.query as { search?: string }

        const { status, ...other } = await this.adminService.find(payback)

        res.status(status).json({ ...other })
    }

    public login: RequestHandler = async (req, res) => {
        const { name, password } = req.body

        const { status, ...other } = await this.adminService.login(name, password)

        res.status(status).json({ ...other })
    }

    public create: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.adminService.create(payload)

        res.status(status).json({ ...other })
    }

    public editMe: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : ''
        const payload = req.body

        const { status, ...other } = await this.adminService.editMe(id, payload)

        res.status(status).json({ ...other })
    }

    public editByAdmin: RequestHandler = async (req, res) => {
        const id = req.params.id
        const payload = req.body

        const { status, ...other } = await this.adminService.editByAdmin(id, payload)

        res.status(status).json({ ...other })
    }

    public remove: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.adminService.remove(id)

        res.status(status).json({ ...other })
    }

    public getMe: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : ''

        const { status, ...other } = await this.adminService.getMe(id)

        res.status(status).json({ ...other })
    }

}

export { AdminController }