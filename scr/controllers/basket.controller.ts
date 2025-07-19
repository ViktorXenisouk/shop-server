import UserModel from "../models/user.model"
import { RequestHandler, Request } from "express"

const getBasket: RequestHandler = async (req, res): Promise<any> => {
    const id = 'userId' in req ? req.userId as string : null
    if (id) {
        try {
            const user = await UserModel.findById(id).select(['id', 'basketInfo'])

            if (!user) {
                return res.status(404).json({ message: 'user no found' })
            }

            res.status(200).json({ data: user.basketInfo })
        }
        catch {
            res.status(500).json({ message: 'error' })
        }
    }
    else {
        res.status(500).json({ message: 'mistake with user id' })
    }
}

const setBasket: RequestHandler = async (req: Request & any, res): Promise<any> => {
    const id = 'userId' in req ? req.userId as string : null
    if (id) {
        try {
            const {array} = req.body.basket

            const user = await UserModel.findById(id)

            if (!user) {
                return res.status(404).json({ message: 'user no found' })
            }

            user.basketInfo = array;

            await user.save()

            res.status(200).json({ data: user.favourite })
        }
        catch {
            res.status(500).json({ message: 'error' })
        }
    }
    else {
        res.status(500).json({ message: 'mistake with user id' })
    }
}

export default {getBasket,setBasket}