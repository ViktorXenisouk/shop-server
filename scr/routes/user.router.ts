import { Router } from "express";
import {BasketController,FavouriteController} from "../controllers/index"
import { checkAuth } from "../middleware/check-auth";
import { editIdArray } from "../validations";
import { validateRequest } from "../middleware/validate-request";
import { UserService } from "../services/user.service";
import {UserController} from "../controllers/user.controller";
import { UserValidations } from "../validations";
import { checkIsAdminLvl2 } from "../middleware/check-admin";
import { idValidation } from "../validations";

const userRouter = Router()

const userService = new UserService()
const userController = new UserController(userService)

userRouter.get('/basket', checkAuth, BasketController.getBasket)
userRouter.get('/favourite', checkAuth, FavouriteController.getFavourite)
userRouter.patch('/basket', editIdArray, validateRequest, checkAuth, BasketController.setBasket)
userRouter.patch('/favourite', editIdArray, validateRequest, checkAuth, FavouriteController.setFavourite)
userRouter.patch('/edit', UserValidations.editMe, validateRequest, checkAuth, userController.editMe)

// routes for admins
userRouter.patch('/edit/:id', checkIsAdminLvl2,idValidation, validateRequest, userController.edit) // edit it
userRouter.get('/find/*', checkIsAdminLvl2, userController.find)
userRouter.get('/:id',checkIsAdminLvl2,userController.getById)
userRouter.patch('/block', userController.setBlocked) // edit it
userRouter.delete('/:id', checkIsAdminLvl2, idValidation, validateRequest, userController.remove) // edit it

export default userRouter