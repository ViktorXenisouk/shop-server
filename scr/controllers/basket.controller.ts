import { RequestHandler } from "express"
import { BasketService } from "../services/basket.service"

class BasketController {
    constructor(private basketService: BasketService) { }

    public Get: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : null

        const { status, ...other } = await this.basketService.Get(id)

        res.status(status).json({ ...other })
    }

    public Set: RequestHandler = async (req, res) => {
        const id = 'userId' in req ? req.userId as string : null
        const { array } = req.body.basket

        const { status, ...other } = await this.basketService.Set(id, array)

        res.status(status).json({ ...other })
    }
}


export { BasketController }