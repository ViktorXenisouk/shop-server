import UserModel from "../models/user.model"

class FavoriteService {
    public async Get(id: string | null) {
        if (id) {
            try {
                const user = await UserModel.findById(id).select(['id', 'favourite'])

                if (!user) return {
                    status: 404,
                    message: 'user no found'
                }

                return {
                    status: 200,
                    data: user.favourite
                }
            }
            catch (err) {
                console.error(err)
                return {
                    status: 500,
                    message: 'server error'
                }
            }
        }
        else {
            return {
                status: 403,
                message: 'can not find your id no access'
            }
        }
    }

    public async Set(id: string | null, favorite: string[]) {
        if (id) {
            try {
                const user = await UserModel.findById(id)

                if (!user)
                    return {
                        status: 404,
                        message: 'user no found'
                    }


                user.favourite = favorite;

                await user.save()

                return { status: 200, data: user.favourite }
            }
            catch (err) {
                console.error(err)
                return {
                    status: 500,
                    message: 'some server error'
                }
            }
        }
        else {
            return {
                status: 400,
                message: 'can not find your id'
            }
        }
    }
}

export { FavoriteService }