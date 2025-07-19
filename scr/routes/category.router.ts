import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { checkIsAdminLvl1 } from "../middleware/check-admin";
import { CatalogValidations } from "../validations";
import { validateRequest } from "../middleware/validate-request";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService()
const categoryController = new CategoryController(categoryService)

const categoryRouter = Router({ mergeParams: true, strict: false })

categoryRouter.get('/find/*',categoryController.Find)
categoryRouter.get('/:id',categoryController.GetCategoryById)

categoryRouter.get('/filter/:path(*)', categoryController.getTags)
categoryRouter.delete('/delete', categoryController.deleteCategory);

categoryRouter.get('/', categoryController.getCategoryTree)
categoryRouter.get('/subpath/:subPath(*)',categoryController.GetCategoryBySubPath)

categoryRouter.post('/create', checkIsAdminLvl1, CatalogValidations.create, validateRequest, categoryController.createCategory)
categoryRouter.patch('/:id', checkIsAdminLvl1, CatalogValidations.edit, validateRequest, categoryController.UpdateCategory)

categoryRouter.post('/upload', categoryController.uploadCatalogJson);
categoryRouter.post('/createJson',categoryController.uploadCatalogJson)

export default categoryRouter