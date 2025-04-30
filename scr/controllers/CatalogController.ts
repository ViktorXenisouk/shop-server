import { RequestHandler, response } from "express";
import * as catalog from "../utils/catalog"

const getCatalogs: RequestHandler = async (req, res) => {
    try {
        const catalogs = catalog.getPublicCatalog()
        res.status(200).json({ data: catalogs })
    }
    catch (err) {
        res.status(500).json({
            message: 'some error'
        })
    }
}

const addOne: RequestHandler = async (req, res): Promise<any> => {
    const { name, discription, path } = req.body;

    try {
        const data = catalog.CreateWithPath(path,name,discription)
        if (!data.success) {
            return res.status(200).json({ success: true })
        }
        else {
            return res.status(500).json({ message: 'this category already exist' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'some error' })
    }
}

const deleteOne: RequestHandler = async (req, res): Promise<any> => {
    const { path } = req.body;
    try {
        const result = catalog.removeByPath(path)

        if(result.success){
            res.status(200).json({success:true,message:'good'})
        }
        else{
            res.status(400).json({success:false,message:'false'})
        }
    }
    catch (err) {
        res.status(500).json({ message: 'something no work' })
    }
}

const updateCategory: RequestHandler = (req,res) => {
    const { path,discription,name } = req.body;
    try {
        const result = catalog.editByPath(path,{name})
        if(result.success){
            res.status(200).json({success:true,message:'good'})
        }
        else{
            res.status(400).json({success:false,message:'false'})
        }
    }
    catch (err) {
        res.status(500).json({ message: 'something no work' })
    }
}

export {getCatalogs,addOne,deleteOne,updateCategory}