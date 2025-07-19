import UserModel from "../models/user.model"
import { RequestHandler } from "express"

const getFavourite: RequestHandler = async (req, res): Promise<any> => {
    const id = 'userId' in req ? req.userId as string : null
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

const setFavourite: RequestHandler = async (req, res): Promise<any> => {
    const id = 'userId' in req ? req.userId as string : null
    if (id) {
        try {
            const {array} = req.body.favourites

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

export default {getFavourite,setFavourite}