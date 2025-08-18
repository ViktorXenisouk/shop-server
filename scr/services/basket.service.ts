import userModel from "../models/user.model"
import { IBasket } from "../types/user.type"

class BasketService {

    public async Get(id: string | null) {
        if (id) {
            try {
                const user = await userModel.findById(id).select(['id', 'basketInfo'])

                if (!user) return {
                    status: 404,
                    message: 'cannot find user'
                }


                return { status: 200, data: user.basketInfo }
            }
            catch (err) {
                console.error(err)
                return {
                    status: 500,
                    message: 'some error'
                }
            }
        }
        else {
            return {
                status: 403,
                message: 'mistake with user id no access'
            }
        }
    }

    public async Set(id: string | null, array: IBasket[]) {
        if (id) {
            try {
                const user = await userModel.findById(id)

                if (!user) return {
                    status: 404,
                    message: 'user no found'
                }

                user.basketInfo = array

                await user.save()

                return {
                    status: 200,
                    data: user.basketInfo
                }
            }
            catch (err) {

                return { status: 500, message: 'server error' }
            }
        }
        else {
            return { status: 403, message: 'mistake with user id no access' }
        }
    }
}

export { BasketService }