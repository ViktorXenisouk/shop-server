import { sanitizePayload } from "../utils/sanitizePayload";
import AllowedRequestModel from "../models/allowed-requests.model";
import ProductModel from "../models/product.model";
import CategoryModel from "../models/category.model";

const limit = 5

class SearchService {
    public async find(search: string) {
        try {
            const universalFilter = { $regex: search, $options: 'i' }

            const result = [] as { type: string, url: string, name: string, icon: string }[]

            const products = await ProductModel.find({ $or: [{ name: universalFilter }, { discription: universalFilter }] })

            products.forEach((value) => {
                const type = 'product'
                const name = value.name
                const url = `/product/${value.id}`
                const icon = value.imgs[0].url ?? ''

                result.push({ type, name, url, icon })
            })

            const categories = await CategoryModel.find({ $or: [{ fullPath: universalFilter }, { name: universalFilter }, { path: universalFilter }, { discription: universalFilter }] })

            categories.forEach((value) => {
                const type = 'category'
                const name = value.name
                const url = `/products/${value.fullPath}`
                const icon = ''

                result.push({ type, name, url, icon })
            })

            return { status: 200, message: 'good', data: result }
        }
        catch (err) {
            return { status: 500, message: 'server error' }
        }
    }

    public async auxiliaryQueries(search:string ) {
        try {
            const filter = {} as any

            if (search) filter.name = {
                $regex: `^${search}`
            }

            const data = await AllowedRequestModel.find(filter).limit(limit).lean()

            return { status: 200, data: data }
        }
        catch (err) {
            return { status: 500, message: 'server error' }
        }
    }

    public async createOrUpdate(payload: { name?: string, type?: string, icon: string, url?: string }) {
        try {
            const sanitizedPayload = sanitizePayload(payload) as { name?: string, type?: string, icon: string, url?: string }

            await AllowedRequestModel.findByIdAndUpdate({ name: sanitizedPayload.name },
                { ...sanitizedPayload, isAutoCreated: false },
                {
                    new: true,
                    upsert: true,
                })

            return { status: 200, message: 'all updateted' }
        }
        catch (err) {
            return { status: 500, message: 'some error' }
        }
    }

    public async delete(payload: { name?: string, type?: string, isAutoCreated?: boolean }) {
        try {
            const sanitizedPayload = sanitizePayload(payload)
            await AllowedRequestModel.deleteMany(sanitizedPayload)
            return { status: 200, message: 'delete many' }
        }
        catch (err) {
            return { status: 500, message: 'server error' }
        }
    }

    public async autoCreate() {
        try {
            await autoCreate()
            return { status: 200, message: 'success' }
        }
        catch (err) {
            return { status: 500, message: 'server error' }
        }
    }
}

const autoCreate = async () => {
    await AllowedRequestModel.deleteMany({ isAutoCreated: true })
    const products = await ProductModel.find()
    const categories = await CategoryModel.find()

    products.forEach(async (value) => {
        const name = value.name
        const url = `/product/${value.id}`
        const type = 'product'
        const search = new AllowedRequestModel({
            name, url, type, icon: ''
        })
        await search.save()
    })
    categories.forEach(async (value) => {
        const name = value.name
        const url = `/products/${value.fullPath}`
        const type = 'category'
        const search = new AllowedRequestModel({
            name, url, type, icon: ''
        })
        await search.save()
    })
}

export { SearchService }