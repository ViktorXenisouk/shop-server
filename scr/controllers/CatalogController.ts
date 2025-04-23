import CatalogModel from "../models/Catalog"
import { RequestHandler, response } from "express";

const getCatalogs: RequestHandler = async (req, res) => {
    try {
        const catalogs = await CatalogModel.find();
        res.status(200).json({ data: catalogs })
    }
    catch (err) {
        res.status(500).json({
            message: 'some error'
        })
    }
}

const getSubCategory: RequestHandler = () => {

}

const addOne: RequestHandler = async (req, res): Promise<any> => {
    const { name, discription, path } = req.body;

    try {
        const category = await CatalogModel.find({ path: path })
        if (category) {
            return res.status(500).json({ message: 'this category already exist' })
        }
        else {
            const newCatalog = await CatalogModel.insertOne({ name, discription, path })
            return res.status(200).json({ success: true })
        }
    }
    catch (err) {

    }
}

const deleteOne: RequestHandler = async (req, res): Promise<any> => {
    const { id } = req.body;
    try {
        CatalogModel.findByIdAndDelete(id)
    }
    catch (err) {

        res.status(500).json({message:'something no work'})
    }
}

const updateCategory: RequestHandler = () => {

}

const findSubCategory = () => {

}