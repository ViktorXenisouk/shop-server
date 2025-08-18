import { RequestHandler } from "express";
import { SearchService } from "../services/search.service";

class SearchController {
    constructor(private searchService: SearchService) { }

    public Find: RequestHandler = async (req, res) => {
        const search = decodeURIComponent(req.params.search as string);

        const { status, ...other } = await this.searchService.Find(search)

        res.status(status).json({ ...other })
    }

    public AuxiliaryQueries: RequestHandler = async (req, res) => {
        const search = req.query.search as string

        const { status, ...other } = await this.searchService.AuxiliaryQueries(search)

        res.status(status).json({ ...other })
    }
    public CreateOrUpdate: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.searchService.CreateOrUpdate(payload)

        res.status(status).json({ ...other })
    }
  public Delete: RequestHandler = async (req, res) => {
        const payload = req.body

        const { status, ...other } = await this.searchService.Delete(payload)

        res.status(status).json({ ...other })
    }

    public AutoCreate: RequestHandler = async (req, res) => {
        const { status, ...other } = await this.searchService.AutoCreate()

        res.status(status).json({ ...other })
    }
}

export { SearchController}