import { Router } from "express";
import { ProductValidations,idValidation } from "../validations";
import { validateRequest } from "../utils/validateRequest";
import { ProductController } from "../controllers";
import { checkIsAdminLvl1 } from "../utils/checkAdmin";

const router = Router()

router.get('/search/*', ProductValidations.search, validateRequest, ProductController.search)
router.get('/:id', idValidation, validateRequest, ProductController.getProductById)

//admin LVL=1
router.post('/', checkIsAdminLvl1, ProductValidations.create, validateRequest, ProductController.create)
router.patch('/', checkIsAdminLvl1, ProductValidations.edit, validateRequest, ProductController.edit)
router.delete('/:id', checkIsAdminLvl1, idValidation, validateRequest, ProductController.remove)

export default router