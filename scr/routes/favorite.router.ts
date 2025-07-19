import { FavoriteController } from "../controllers"
import { FavoriteService } from "../services/favorite.service"

import { Router } from "express";
import { checkAuth } from "../middleware/check-auth";
import { validateRequest } from "../middleware/validate-request";

const favoriteService = new FavoriteService()
const favoriteController = new FavoriteController(favoriteService)

const favoriteRouter = Router()

favoriteRouter.get(
    '/',
    checkAuth,
    favoriteController.Get)


favoriteRouter.patch(
    '/',
    validateRequest, checkAuth,
    favoriteController.Set)

export default favoriteRouter