import express from 'express';
import multer from 'multer';
import {ImageValidations} from "../validations"
import { ImageService } from '../services/image.service';
import { ImageController } from '../controllers/image.controller';
import { validateRequest } from '../middleware/validate-request';

const imageService = new ImageService()
const imageController = new ImageController(imageService)

const imagesRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

imagesRouter.post(
    '/upload/:folder(*)', 
    upload.single('image'), ImageValidations.checkFolder, validateRequest,
    imageController.UploadImage);

imagesRouter.get(
    '/:folder(*)', 
    upload.single('image'), ImageValidations.checkFolder,validateRequest,
    imageController.GetImages);

export default imagesRouter;