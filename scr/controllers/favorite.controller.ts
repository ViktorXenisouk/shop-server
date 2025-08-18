import { RequestHandler } from "express"
import { FavoriteService } from "../services/favorite.service"

class FavoriteController {
    constructor(private favoriteService: FavoriteService) { }

    public Get: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : null

        const { status, ...other } = await this.favoriteService.Get(id)

        res.status(status).json({ ...other })
    }

    public Set: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : null
        const { array } = req.body.favorite

        const { status, ...other } = await this.favoriteService.Set(id, array)

        res.status(status).json({ ...other })
    }
}

export { FavoriteController }