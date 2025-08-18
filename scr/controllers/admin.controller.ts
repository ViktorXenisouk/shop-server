import { RequestHandler } from "express";
import { AdminService } from "../services/admin.service";

class AdminController {
    constructor(private adminService: AdminService) { }

    public GetById: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.adminService.GetById(id)

        res.status(status).json({ ...other })
    }

    public Find: RequestHandler = async (req, res) => {
        const payback = req.query as { search?: string }

        const { status, ...other } = await this.adminService.Find(payback)

        res.status(status).json({ ...other })
    }

    public Login: RequestHandler = async (req, res) => {
        const { name, password } = req.body

        const { status, ...other } = await this.adminService.Login(name, password)

        res.status(status).json({ ...other })
    }

    public Create: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.adminService.Create(payload)

        res.status(status).json({ ...other })
    }

    public EditMe: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : ''
        const payload = req.body

        const { status, ...other } = await this.adminService.EditMe(id, payload)

        res.status(status).json({ ...other })
    }

    public EditByAdmin: RequestHandler = async (req, res) => {
        const id = req.params.id
        const payload = req.body

        const { status, ...other } = await this.adminService.EditByAdmin(id, payload)

        res.status(status).json({ ...other })
    }

    public Delete: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.adminService.Delete(id)

        res.status(status).json({ ...other })
    }

    public GetMe: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : ''

        const { status, ...other } = await this.adminService.GetMe(id)

        res.status(status).json({ ...other })
    }

}

export { AdminController }