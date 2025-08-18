import ProductModel from "../models/product.model"
import { ObjectId } from "mongodb";
import { aggregateWithPagination } from "../utils/aggregate-with-pagination";
import { parseTags } from "../utils/parse-tags";
import { sanitizePayload } from "../utils/sanitize-payload";

class ProductService {
    public async GetById(id: string) {
        try {
            const product = await ProductModel.findById(new ObjectId(id))

            if (!product) return {
                status: 404,
                message: 'can not find product'
            }

            return {
                status: 200,
                data: product
            }
        }
        catch (err) {
            console.error(err)
            return {
                status: 500,
                message: 'some server error during getting id'
            }
        }
    }

    public async GetProductsByIds(ids: string[]) {
        try {
            const products = []
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i]
                const product = await ProductModel.findById(new ObjectId(id)).lean()
                if (product)
                    products.push(product)
            }

            if (!products || products.length === 0) return {
                status: 404,
                message: 'can not find products'
            }

            return {
                status: 200,
                message: `find ${products.length} products of ${ids.length}`,
                data: products,
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

    public async Find(page: number, limit: number, order: 'asc' | 'desc', field: string, category?: string, tags?: string, search?: string) {
        try {
            if (page <= 0) return {
                status: 400,
                message: 'wrong page'
            }

            const allowedSortFields = ['price', 'rating', 'createdAt', 'name'];

            const sortOrder = order === 'asc' ? 1 : -1;

            const sortField: string = allowedSortFields.includes(field)
                ? field
                : 'createdAt';

            const filter = {} as any

            const tagsArray = parseTags(tags)

            if (category) {
                filter.category = { $regex: `^${category}`, $options: 'i' };
            }

            if (tagsArray && tagsArray.length > 0) {
                filter.tags = { $in: tagsArray };
            }

            if (search) {
                filter.name = { $regex: `^${search}`, $options: 'i' }
            }

            const result = await aggregateWithPagination(ProductModel, filter, page, limit, sortField, sortOrder)

            if (result.paginationInfo.total == 0) {
                return {
                    status: 404,
                    message: 'do not find products',
                    paginationInfo: result.paginationInfo
                }
            }

            return {
                status: 200,
                ...result,
                message: 'good'
            }
        }
        catch (err) {
            return { status: 500, message: err || 'some error' }
        }
    }

    public async Create(payload: { name: string, discription: string, category: string, tags: string[], imgs: string[], blocks: any[] }) {
        try {
            const item = await ProductModel.findOne({ name: name })

            if (item) return { status: 500, message: 'product already exist' }

            const sanitized = sanitizePayload(payload)

            const product = new ProductModel(sanitized)

            const post = await product.save()

            return {
                status: 200,
                message: 'nice',
                data: post
            }
        }
        catch (err) {
            return { status: 500, message: 'err' }
        }
    }

    public async Edit(id: string, payload: { name: string, discription: string, tags: string[], category: string, imgs: { url: string, name: string }[], blocks: any[] }) {
        try {
            const { name, discription, tags, category, imgs, blocks } = payload;

            const item = await ProductModel.findById(id)

            if (!item) return {
                status: 404,
                message: 'cant find'
            }

            if (name) item.name = name;
            if (discription) item.discription = discription
            if (tags) item.tags = tags

            if (name) {
                const i = await ProductModel.findOne({ name: name })

                if (!i || (i && name != item.name)) {
                    item.name = name
                }
            }

            if (imgs) item.imgs = imgs

            if (category) {
                item.category = category
            }

            if (blocks) {
                item.blocks = blocks
            }

            await item.save()

            return {
                status: 200,
                message: 'good',
                data: item.toObject()
            }
        }
        catch (err) {
            console.log(err)
            return {
                status: 500,
                message: 'server error'
            }
        }
    }

    public async Delete(id: string) {
        try {
            const product = await ProductModel.findByIdAndDelete(id);

            if (!product) return {
                status: 404,
                message: 'no find'
            }

            return {
                status: 204,
                message: 'product successfuly delete'
            }
        }
        catch (err) {
            return {
                status: 500,
                message: 'server error'
            }
        }
    }
}

export { ProductService }