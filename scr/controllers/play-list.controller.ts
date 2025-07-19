import { RequestHandler } from "express";
import { PlayListService } from "../services/play-list.service";

class PlayListController {
    constructor(private playListService: PlayListService) { }

    public GetByName: RequestHandler = async (req, res) => {
        const name = req.params.name
        const { status, ...other } = await this.playListService.GetByName(name)
        res.status(status).json({ ...other })
    }

    public Edit: RequestHandler = async (req, res) => {
        const name = req.params.name
        const payload = req.body
        const { status, ...other } = await this.playListService.Update(name, payload)
        res.status(status).json({ ...other })
    }

    public GetRootPlayLists: RequestHandler = async (req, res) => {
        const { status, ...other } = await this.playListService.GetRootPlayLists()
        res.status(status).json({ ...other })
    }

    public Find: RequestHandler = async (req, res) => {
        const { parentPath } = req.query as { parentPath: string }
        const { status, ...other } = await this.playListService.Find(parentPath)
        res.status(status).json({ ...other })
    }
    public GetByFullPath: RequestHandler = async (req, res) => {
        const fullPath = req.params.fullPath
        const { status, ...other } = await this.playListService.getPlayListByFullPath(fullPath)
        res.status(status).json({ ...other })
    }

    public GetBySubPath: RequestHandler = async (req, res) => {
        const subPath = req.params.subPath
        const { status, ...other } = await this.playListService.GetPlayListBySubPath(subPath)
        res.status(status).json({ ...other })
    }

    public DeleteByFullPath: RequestHandler = async (req, res) => {
        const fullPath = req.params.fullPath
        const { status, ...other } = await this.playListService.DeletePlayListByFullPath(fullPath)
        res.status(status).json({ ...other })
    }

    public Create: RequestHandler = async (req, res) => {
        const payback = req.body
        const { status, ...other } = await this.playListService.createPlaylist(payback)
        res.status(status).json({ ...other })
    }

    public GetProducts: RequestHandler = async (req, res) => {
        const page = 'page' in req.query ? parseInt(req.query.page as string) : null
        const limit = 'limit' in req.query ? parseInt(req.query.limit as string) : null
        const fullPath = req.params.fullPath
        const { status, ...other } = await this.playListService.getProductsByFullPath(fullPath, page, limit)
        res.status(status).json({ ...other })
    }
}

export { PlayListController }