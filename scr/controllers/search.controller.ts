import { RequestHandler } from "express";
import { SearchService } from "../services/search.service";

class SearchController {
    constructor(private searchService: SearchService) { }

    public find: RequestHandler = async (req, res) => {
        const search = decodeURIComponent(req.params.search as string);

        const { status, ...other } = await this.searchService.find(search)

        res.status(status).json({ ...other })
    }

    public auxiliaryQueries: RequestHandler = async (req, res) => {
        const search = req.query.search as string

        const { status, ...other } = await this.searchService.auxiliaryQueries(search)

        res.status(status).json({ ...other })
    }
    public createOrUpdate: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.searchService.createOrUpdate(payload)

        res.status(status).json({ ...other })
    }
  public delete: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.searchService.delete(payload)

        res.status(status).json({ ...other })
    }

    public autoCreate: RequestHandler = async (req, res) => {
        const { status, ...other } = await this.searchService.autoCreate()

        res.status(status).json({ ...other })
    }
}

export { SearchController}