import { Router } from "express";
import { AdminValidations } from "../validations";
import { AdminController } from "../controllers";
import { checkIsAdminLvl1,checkIsAdminLvl3 } from "../utils/checkAdmin";
import { validateRequest } from "../utils/validateRequest";
import { idValidation } from "../validations";

const router = Router()

router.post('/login', AdminValidations.login, validateRequest, AdminController.login);
router.get('/', checkIsAdminLvl1, validateRequest, AdminController.getMe);

router.post('/', checkIsAdminLvl3, AdminValidations.create, validateRequest, AdminController.create)
router.delete('/:id', checkIsAdminLvl3, idValidation, validateRequest, AdminController.remove)
router.patch('/', checkIsAdminLvl3, validateRequest, AdminController.editMe)

export default router