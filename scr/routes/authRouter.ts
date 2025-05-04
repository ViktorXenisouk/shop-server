import { Router } from "express";
import { UserValidations } from "../validations";
import { checkAuth } from "../utils/checkAuth";
import { validateRequest } from "../utils/validateRequest";
import { UserController } from "../controllers";

const authRouter = Router()

authRouter.post('/auth/register', UserValidations.register, validateRequest, UserController.register)
authRouter.post('/auth/login', UserValidations.login, validateRequest, UserController.login)
authRouter.get('/auth/getUser', checkAuth, UserController.getMe)

export default authRouter