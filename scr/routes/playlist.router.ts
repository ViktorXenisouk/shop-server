import { Router } from "express";
import { PlayListController } from "../controllers/play-list.controller";
import { PlayListService } from "../services/play-list.service";

const playListService = new PlayListService()
const playListController = new PlayListController(playListService)
const playListRouter = Router()

playListRouter.get(
    '/find/*',
    playListController.Find)

playListRouter.get(
    '/products-of/:fullPath(*)',
    playListController.GetProducts
)

playListRouter.get(
    '/root',
    playListController.GetRootPlayLists
)

playListRouter.get(
    '/:name',
    playListController.GetByName)

    playListRouter.get(
    '/subpath/:subPath(*)',
    playListController.GetBySubPath)

playListRouter.delete(
    '/delete/:fullPath(*)',
    playListController.DeleteByFullPath)

playListRouter.post(
    '/',
    playListController.Create)

playListRouter.patch(
    '/:name',
    playListController.Edit)

export default playListRouter