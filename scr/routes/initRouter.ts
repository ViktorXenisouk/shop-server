import {InitProducts,generateTags} from "../controllers/InitController"
import { Router } from "express";

const productRouter = Router()

productRouter.post('/p',InitProducts)
productRouter.post('/e',generateTags)

export default productRouter