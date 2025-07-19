import { Router } from "express";
import { ProductValidations,idValidation } from "../validations";
import { validateRequest } from "../middleware/validate-request";
import { checkIsAdminLvl1 } from "../middleware/check-admin";
import { checkPathAndLimit } from "../middleware/check-path-and-limit";

import { ProductService } from "../services/product-service";
import { ProductController } from "../controllers";

const productService = new ProductService()
const productController = new ProductController(productService)
const productRouter = Router()

productRouter.get('/search/:category(*)', ProductValidations.search, validateRequest,checkPathAndLimit, productController.search)
productRouter.get('/:id', idValidation, validateRequest, productController.getProductById)
productRouter.delete('/delete/:id', checkIsAdminLvl1, idValidation, validateRequest, productController.remove)

//admin LVL=1
productRouter.post('/', checkIsAdminLvl1, ProductValidations.create, validateRequest, productController.create)
productRouter.patch('/:id', checkIsAdminLvl1, ProductValidations.edit, validateRequest, productController.edit)

export default productRouter