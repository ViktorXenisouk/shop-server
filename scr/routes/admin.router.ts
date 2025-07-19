import { Router } from "express";
import { AdminValidations } from "../validations";
import { checkIsAdminLvl1, checkIsAdminLvl3 } from "../middleware/check-admin";
import { validateRequest } from "../middleware/validate-request";
import { idValidation } from "../validations";
import { AdminService } from "../services/admin.service";
import { AdminController } from "../controllers/admin.controller";

const adminService = new AdminService()
const adminController = new AdminController(adminService)
const adminRouter = Router()

adminRouter.post('/login', AdminValidations.login, validateRequest, adminController.login);
adminRouter.post('/', checkIsAdminLvl3, AdminValidations.create, validateRequest, adminController.create)

adminRouter.delete('/:id', checkIsAdminLvl3, idValidation, validateRequest, adminController.remove)

adminRouter.get('/', checkIsAdminLvl1, validateRequest, adminController.getMe);

adminRouter.get('/find/*',checkIsAdminLvl3,adminController.find)
adminRouter.get('/:id',checkIsAdminLvl3,adminController.getById)

adminRouter.patch('/', checkIsAdminLvl1, validateRequest, adminController.editMe)
adminRouter.patch('/:id',checkIsAdminLvl3,adminController.editByAdmin)

export default adminRouter