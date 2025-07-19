import { Router } from "express";
import * as AuthValidations from "../validations/auth.validations";
import { checkAuth } from "../middleware/check-auth";
import { validateRequest } from "../middleware/validate-request";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

const authService = new AuthService()
const authController = new AuthController(authService)

const authRouter = Router()

authRouter.put(
    '/email',
    AuthValidations.emailAvailable, validateRequest,
    authController.IsEmailAvailable)

authRouter.post(
    '/register',
    AuthValidations.register, validateRequest,
    authController.Register)

authRouter.post(
    '/login',
    AuthValidations.login, validateRequest,
    authController.Login)

authRouter.get(
    '/getUser',
    checkAuth,
    authController.GetMe)

export default authRouter