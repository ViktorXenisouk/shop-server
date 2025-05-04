import { Router } from "express";
import * as CategoryController from "../controllers/CategoryController";
import { checkIsAdminLvl1 } from "../utils/checkAdmin";
import { CatalogValidations,idValidation } from "../validations";
import { validateRequest } from "../utils/validateRequest";

const router = Router()

router.get('/', CategoryController.getCategoryTree)
router.get('/filter/*',validateRequest,CategoryController.getTags)

router.post('/', checkIsAdminLvl1, CatalogValidations.create, validateRequest, CategoryController.createCategory)
router.patch('/', checkIsAdminLvl1, CatalogValidations.edit, validateRequest, CategoryController.updateCategory)
router.delete("/:path*/tags/:category", checkIsAdminLvl1, validateRequest, CategoryController.removeTag) // you need fix this


//проверить ;
router.post('/upload', CategoryController.uploadCatalogJson);
router.delete('/:path', CategoryController.deleteCategory);


export default router