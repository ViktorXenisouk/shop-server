import UserModel from "../models/User"
import { RequestHandler, Request } from "express"


const getBasket: RequestHandler = async (req: Request & any, res): Promise<any> => {
    const id = req.userId
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

const getFavourite: RequestHandler = async (req: Request & any, res): Promise<any> => {
    const id = req.userId
    if (id) {
        try {
            const user = await UserModel.findById(id).select(['id', 'favourite'])

            if (!user) {
                return res.status(404).json({ message: 'user no found' })
            }

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
const setBasket: RequestHandler = async (req: Request & any, res): Promise<any> => {
    const id = req.userId
    if (id) {
        try {
            const {array} = req.body.array

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

const setFavourite: RequestHandler = async (req: Request & any, res): Promise<any> => {
    const id = req.userId
    if (id) {
        try {
            const {array} = req.body.array

            const user = await UserModel.findById(id)

            if (!user) {
                return res.status(404).json({ message: 'user no found' })
            }

            user.favourite = array;

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

export {getBasket,getFavourite,setBasket,setFavourite}