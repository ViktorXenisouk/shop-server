import { RequestHandler } from "express";
import ProductModel from ".././models/Product"
import { splitPath } from "../core/splitPath";

const getProductById: RequestHandler = async (req, res): Promise<any> => {
    const id = req.body.id

    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: 'product no exist'
        })
    }
}

type FindObjectOptions = {
    name: string,
    tag: string[],
    category: string,
}

const find: RequestHandler = (req, res) => {
    const path = req.params[0];  // Все, что после "/products"
    const { name, tags } = req.query;

}

const add: RequestHandler = async (req, res): Promise<any> => {
    const { name, discription, tags, path, imgs } = req.body

    try {
        const item = await ProductModel.findOne({ name: name })

        if (item) return res.status(500).json({ message: 'product already exist' })

        const paths = splitPath(path)

        const product = new ProductModel({
            name, discription, paths, tags, imgs
        })

        paths.push(paths[paths.length - 1] + '/' + product.id)

        product.$set({
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
        const { name, discription, tags,path,id } = req.body;

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
            paths.push(path[path.length - 1] + '/' + item.id)
            item.paths = paths
        }

        await item.save()

        return res.status(200).json({ message: 'nice' })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

export { add, update }