import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { checkIsAdminLvl1 } from "../middleware/check-admin";
import { idValidation } from "../validations";
import { CatalogValidations } from "../validations";
import { validateRequest } from "../middleware/validate-request";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService()
const categoryController = new CategoryController(categoryService)

const categoryRouter = Router({ mergeParams: true, strict: false })

categoryRouter.get(
    '/find/*',
    CatalogValidations.find, validateRequest,
    categoryController.Find)

categoryRouter.get(
    '/:id',
    idValidation, validateRequest,
    categoryController.GetById)

categoryRouter.get(
    '/filter/:path(*)',
    CatalogValidations.getTags, validateRequest,
    categoryController.GetTags)

categoryRouter.delete('/delete',
    CatalogValidations.deleteCategory, validateRequest,
    categoryController.Delete);

categoryRouter.get(
    '/',
    categoryController.GetCategoryTree)

categoryRouter.get(
    '/subpath/:subPath(*)',
    CatalogValidations.getCategoryBySubPath, validateRequest,
    categoryController.GetBySubPath)

categoryRouter.post(
    '/create',
    checkIsAdminLvl1, CatalogValidations.create, validateRequest,
    categoryController.Create)

categoryRouter.patch(
    '/:id',
    checkIsAdminLvl1, CatalogValidations.edit, validateRequest,
    categoryController.Edit)

categoryRouter.post(
    '/createJson',
    categoryController.UploadCatalogJson)

categoryRouter.post(
    '/createJsonm',
    categoryController.UploadCatalogJsonMultiple)

export default categoryRouter