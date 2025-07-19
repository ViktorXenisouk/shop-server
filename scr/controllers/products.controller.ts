import { RequestHandler } from "express";
import { ProductService } from "../services/product-service";

class ProductController {
    constructor(private productService: ProductService) { }

    public getProductById: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.productService.getProductById(id)

        res.status(status).json({ ...other })
    }

    public search: RequestHandler = async (req, res) => {
        const page = 'page' in req ? parseInt(req.page as string) : 1
        const limit = 'limit' in req ? parseInt(req.limit as string) : 20
        const order = req.query.order as 'asc' | 'desc' ?? 'asc'
        const sort = req.query.sort as string || 'createdAt'

        const { status, ...other } = await this.productService.search(page, limit, order, sort)

        res.status(status).json({ ...other })
    }

    public create: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.productService.create(payload)
        res.status(status).json({ ...other })
    }

    public edit: RequestHandler = async (req, res) => {
        const id = req.params.id
        const payload = req.body;

        const { status, ...other } = await this.productService.edit(id, payload)
                res.status(status).json({ ...other })
    }

    public remove: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.productService.remove(id)
        res.status(status).json({ ...other })
    }
}

export {ProductController}