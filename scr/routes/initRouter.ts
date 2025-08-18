import {InitProducts,generateTags,GenerateImages} from "../controllers/InitController"
import { Router } from "express";

const productRouter = Router()

productRouter.post('/p',InitProducts)
productRouter.post('/e',generateTags)
productRouter.post('/a',GenerateImages)



export default productRouter