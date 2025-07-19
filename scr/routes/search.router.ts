import { Router } from "express";
import { SearchService } from "../services/search.service";
import { SearchController } from "../controllers/search.controller"
import { checkIsAdminLvl2 } from "../middleware/check-admin";
import * as SearchValidations from "../validations/search.validations"
import { validateRequest } from "../middleware/validate-request";

const searchService = new SearchService()
const searchController = new SearchController(searchService)

const searchRouter = Router()

// for admins

searchRouter.post(
    '/',
    checkIsAdminLvl2,
    searchController.AutoCreate)

searchRouter.patch(
    '/',
    checkIsAdminLvl2, SearchValidations.createOrUpdate, validateRequest,
    searchController.CreateOrUpdate)

searchRouter.delete(
    '/',
    checkIsAdminLvl2, SearchValidations.remove, validateRequest,
    searchController.Delete)

// for users

searchRouter.get(
    '/help/*',
    SearchValidations.auxiliaryQueries, validateRequest,
    searchController.AuxiliaryQueries)

searchRouter.get(
    '/find/:search(*)',
    SearchValidations.find, validateRequest,
    searchController.Find)

export default searchRouter