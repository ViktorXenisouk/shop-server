import { Router } from "express";
import { ProductValidations, idValidation } from "../validations";
import { validateRequest } from "../middleware/validate-request";
import { checkIsAdminLvl1 } from "../middleware/check-admin";
import { checkPathAndLimit } from "../middleware/check-path-and-limit";

import { ProductService } from "../services/product-service";
import { ProductController } from "../controllers";

const productService = new ProductService()
const productController = new ProductController(productService)
const productRouter = Router()

productRouter.get(
    '/search/*',
    ProductValidations.search, validateRequest, checkPathAndLimit,
    productController.Find)

productRouter.get(
    '/:id',
    idValidation, validateRequest,
    productController.GetById)

productRouter.put(
    '/get-ids',
    productController.GetProductsByIds
)

//admin LVL=1

productRouter.delete(
    '/:id',
    checkIsAdminLvl1, idValidation, validateRequest,
    productController.Delete)

productRouter.post(
    '/',
    checkIsAdminLvl1, ProductValidations.create, validateRequest,
    productController.Create)

productRouter.patch('/:id',
    checkIsAdminLvl1, idValidation, ProductValidations.edit, validateRequest,
    productController.Edit)

export default productRouter