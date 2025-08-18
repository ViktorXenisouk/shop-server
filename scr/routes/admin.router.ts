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

adminRouter.post(
    '/login', 
    AdminValidations.login, validateRequest,
    adminController.Login);

adminRouter.post(
    '/', 
    checkIsAdminLvl3, AdminValidations.create, validateRequest, 
    adminController.Create)

adminRouter.delete(
    '/:id', 
    checkIsAdminLvl3, idValidation, validateRequest, 
    adminController.Delete)

adminRouter.get(
    '/', 
    checkIsAdminLvl1, 
    adminController.GetMe);

adminRouter.get(
    '/find/*',
    checkIsAdminLvl3,AdminValidations.find,validateRequest,
    adminController.Find)

adminRouter.get(
    '/:id',
    checkIsAdminLvl3,idValidation,validateRequest,
    adminController.GetById)

adminRouter.patch(
    '/', 
    checkIsAdminLvl1,AdminValidations.editMe ,validateRequest, 
    adminController.EditMe)

adminRouter.patch(
    '/:id',
    checkIsAdminLvl3,idValidation,AdminValidations.editByAdmin,validateRequest,
    adminController.EditByAdmin)

export default adminRouter