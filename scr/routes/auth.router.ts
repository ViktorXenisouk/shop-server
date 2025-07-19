import { Router } from "express";
import { UserValidations } from "../validations";
import { checkAuth } from "../middleware/check-auth";
import { validateRequest } from "../middleware/validate-request";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

const authService = new AuthService()
const authController = new AuthController(authService) 

const authRouter = Router()

authRouter.put('/email',authController.isEmailAvailable)
authRouter.post('/register', UserValidations.register, validateRequest, authController.register)
authRouter.post('/login', UserValidations.login, validateRequest, authController.login)
authRouter.get('/getUser', checkAuth, authController.getMe)

export default authRouter