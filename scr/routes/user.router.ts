import { Router } from "express";
import { checkAuth } from "../middleware/check-auth";
import { validateRequest } from "../middleware/validate-request";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserValidations } from "../validations";
import { checkIsAdminLvl2 } from "../middleware/check-admin";
import { idValidation } from "../validations";

const userRouter = Router()

const userService = new UserService()
const userController = new UserController(userService)

userRouter.patch(
    '/edit',
    UserValidations.editMe, validateRequest, checkAuth,
    userController.EditMe)

// routes for admins
userRouter.patch(
    '/edit/:id',
    checkIsAdminLvl2, idValidation, validateRequest,
    userController.Edit) // edit it

userRouter.get(
    '/find/*',
    checkIsAdminLvl2,
    userController.Find)

userRouter.get(
    '/:id',
    checkIsAdminLvl2,
    userController.GetById)

userRouter.patch(
    '/block',
    userController.SetBlocked)

userRouter.delete(
    '/:id',
    checkIsAdminLvl2, idValidation, validateRequest,
    userController.Delete)

export default userRouter