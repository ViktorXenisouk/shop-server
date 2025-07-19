import ProductModel from "../models/product.model"
import { ObjectId } from "mongodb";
import { aggregateWithPagination } from "../utils/aggregateWithPagination";
import { parseTags } from "../utils/parseTags";
import { sanitizePayload } from "../utils/sanitizePayload";


class ProductService {
    public async getProductById(id: string) {
        try {
            const product = await ProductModel.findById(new ObjectId(id))

            if (!product) return { success: false, status: 404, message: 'can not find product' }

            return { success: true, status: 200, data: product }
        }
        catch (err) {
            return { success: false, status: 500, message: err || '' }
        }
    }

    public async search(page: number, limit: number, order: 'asc' | 'desc', field: string, category?: string, tags?: string) {
        try {
            if (page <= 0)
                return { status: 500, message: 'wrong page' }

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

            const result = await aggregateWithPagination(ProductModel, filter, page, limit, sortField, sortOrder)

            if (result.paginationInfo.total == 0) {
                return { status: 404, message: 'do not find products', paginationInfo: result.paginationInfo }
            }

            return { ...result, success: true, status: 200, message: 'good' }
        }
        catch (err) {
            return { status: 500, message: err || 'some error' }
        }
    }

    public async create(payload: { name: string, discription: string, tags: string[], category: string, imgs: string[], blocks: any[] }) {
        try {
            const item = await ProductModel.findOne({ name: name })

            if (item) return { status: 500, message: 'product already exist' }

            const sanitized = sanitizePayload(payload)

            const product = new ProductModel(sanitized)

            const post = await product.save()

            return { status: 200, message: 'nice', data: post }
        }
        catch (err) {
            return { status: 500, message: 'err' }
        }
    }

    public async edit(id: string, payload: { name: string, discription: string, tags: string[], category: string, imgs: { url: string, name: string }[], blocks: any[] }) {
        try {
            const { name, discription, tags, category, imgs, blocks } = payload;

            const item = await ProductModel.findById(id)

            if (!item) return { status: 404, message: 'cant find' }

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

            return { status: 200, message: 'good', data: item.toObject() }
        }
        catch (err) {
            return { status: 500, message: 'server error' }
        }
    }

    public async remove(id: string) {
        try {
            const product = await ProductModel.findByIdAndDelete(id);

            if (!product) return { status: 400, message: 'no good' }

            return { status: 200, message: 'product successfuly delete' }
        }
        catch (err) {
            return {
                status: 500,
                message: err || 'server error'
            }
        }
    }
}

export { ProductService }