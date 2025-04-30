import { RequestHandler } from "express";
import ProductModel from ".././models/Product"
import { splitPath } from "../utils/splitPath";

const getProductById: RequestHandler = async (req, res): Promise<any> => {
    try {
        const { id } = req.params

        const product = await ProductModel.findById(id)

        if (product) return res.status(404).json({ message: 'can not find product' })

        res.status(200).json({ item: product })
    }
    catch (err) {
        res.status(500).json({ message: 'some error' })
    }
}

const search: RequestHandler = async (req, res): Promise<any> => {
    try {
        const category = req.query.category as string;
        let tags = req.query.tags as any;

        if(tags){
            tags = tags.split(',');
        }

        const cat = category ? { $elemMatch: { $eq: category } } : undefined
        const tg = tags ? { $elemMatch: { $in: [...tags] } } : undefined
    
        const json = {} as any

        if (cat) json.paths = cat
        if (tg) json.tags = tg

        const products = await ProductModel.find(json)

        if(!products){
            return res.status(404).json({message:'do not find products'})
        }

        res.status(200).json({ products })
    }
    catch (err) {
        res.status(500).json({ message: 'some error' })
    }
}

const create: RequestHandler = async (req, res): Promise<any> => {
    const { name, discription, tags, path, imgs } = req.body

    try {
        const item = await ProductModel.findOne({ name: name })

        if (item) return res.status(500).json({ message: 'product already exist' })

        const paths = splitPath(path)

        const product = new ProductModel({
            name, discription, paths, tags, imgs
        })

        const post = await product.save()

        return res.status(200).json({ message: 'nice', post })
    }
    catch (err) {
        return res.status(500).json(err)
    }

}

const update: RequestHandler = async (req, res): Promise<any> => {
    try {
        const { name, discription, tags, path, id } = req.body;

        const item = await ProductModel.findById(id)

        if (!item) return res.status(404).json({ message: 'cant find' })

        if (name) item.name = name;
        if (discription) item.discription = discription
        if (tags) item.tags = tags

        if (name) {
            const i = await ProductModel.findOne({ name: name })

            if (!i || (i && name != item.name)) {
                item.name = name
            }
        }

        if (path) {
            const paths = splitPath(path)
            item.paths = paths
        }

        await item.save()

        return res.status(200).json({ message: 'nice' })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

export { create, update, search, getProductById }