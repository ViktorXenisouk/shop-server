import { Router } from "express";
import {AuthUsersController} from "../controllers/index"
import { checkAuth } from "../utils/checkAuth";
import { editIdArray } from "../validations";
import { validateRequest } from "../utils/validateRequest";
import { UserController } from "../controllers/index";
import { UserValidations } from "../validations";
import { checkIsAdminLvl2 } from "../utils/checkAdmin";
import { idValidation } from "../validations";

const router = Router()

router.get('/basket', checkAuth, AuthUsersController.getBasket)
router.get('/favourite', checkAuth, AuthUsersController.getFavourite)
router.patch('/basket', editIdArray, validateRequest, checkAuth, AuthUsersController.setBasket)
router.patch('/favourite', editIdArray, validateRequest, checkAuth, AuthUsersController.setFavourite)
router.patch('/', UserValidations.editMe, validateRequest, checkAuth, UserController.editMe)

// routes for admins

router.get('/', checkIsAdminLvl2, UserController.getAll)
router.patch('/block', checkIsAdminLvl2, UserValidations.block, validateRequest, UserController.setIsBlocked) // edit it
router.delete('/:id', checkIsAdminLvl2, idValidation, validateRequest, UserController.remove) // edit it
router.patch('/:id', checkIsAdminLvl2,idValidation, validateRequest, UserController.edit) // edit it


export default router