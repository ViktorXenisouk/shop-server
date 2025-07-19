import { Router } from "express";
import { SearchService } from "../services/search.service";
import {SearchController} from "../controllers/search.controller"
import { checkIsAdminLvl3 } from "../middleware/check-admin";

const searchService = new SearchService()
const searchController = new SearchController(searchService)

const searchRouter = Router()

searchRouter.post('/',searchController.autoCreate)
searchRouter.patch('/',searchController.createOrUpdate)
searchRouter.delete('/',searchController.delete)
searchRouter.get('/help/*',searchController.auxiliaryQueries)
searchRouter.get('/find/:search(*)',searchController.find)

export default searchRouter