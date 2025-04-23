import { RequestHandler } from "express";
import ProductModel from ".././models/Product"
import { splitPath } from "../core/splitPath";

const getProductById: RequestHandler = async (req, res) : Promise<any> => {
    const id = req.body.productId

    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message : 'product no exist'
        })
    }
}

type FindObjectOptions = {
    name:string,
    tag:string[],
    category:string,
}

const find : RequestHandler = (req, res) => {
    const path = req.params[0];  // Все, что после "/products"
    const { name, tags } = req.query;

}

const add : RequestHandler = (req,res) => {
    const {name,discription,tags,path,imgs} = req.body

    try{
        const paths = splitPath(path)
    }
    catch(err){
        
    }

}

const update : RequestHandler = (req,res) => {

}