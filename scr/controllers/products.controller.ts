import { RequestHandler } from "express";
import { ProductService } from "../services/product-service";

class ProductController {
    constructor(private productService: ProductService) { }

    public GetById: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.productService.GetById(id)

        res.status(status).json({ ...other })
    }

    public GetProductsByIds: RequestHandler = async (req, res) => {
        const ids = req.body.ids as string[]

        const { status, ...other } = await this.productService.GetProductsByIds(ids)

        res.status(status).json({ ...other })
    }

    public Find: RequestHandler = async (req, res) => {
        const page = 'page' in req ? parseInt(req.page as string) : 1
        const limit = 'limit' in req ? parseInt(req.limit as string) : 20
        const order = req.query.order as 'asc' | 'desc' ?? 'asc'
        const sort = req.query.sort as string || 'createdAt'

        const category = req.query.category as string

        const tag = req.query.tags as string

        const search = req.query.search as string

        const { status, ...other } = await this.productService.Find(page, limit, order, sort, category, tag, search)

        res.status(status).json({ ...other })
    }

    public Create: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.productService.Create(payload)
        res.status(status).json({ ...other })
    }

    public Edit: RequestHandler = async (req, res) => {
        const id = req.params.id
        const payload = req.body;

        const { status, ...other } = await this.productService.Edit(id, payload)
        res.status(status).json({ ...other })
    }

    public Delete: RequestHandler = async (req, res) => {
        const id = req.params.id

        const { status, ...other } = await this.productService.Delete(id)
        res.status(status).json({ ...other })
    }
}

export { ProductController }