import { Router } from "express";
import { BasketController } from "../controllers/index"
import { BasketService } from "../services/basket.service";
import { checkAuth } from "../middleware/check-auth";
import { validateRequest } from "../middleware/validate-request";

const basketService = new BasketService()
const basketController = new BasketController(basketService)

const basketRouter = Router()

basketRouter.get(
    '/',
    checkAuth,
    basketController.Get)


basketRouter.patch(
    '/',
    validateRequest, checkAuth,
    basketController.Set)

export default basketRouter