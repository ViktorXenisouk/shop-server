import express from 'express';
import multer from 'multer';
import { ImageService } from '../services/image.service';
import { ImageController } from '../controllers/image.controller';

const imageService = new ImageService()
const imageController = new ImageController(imageService)

const imagesRouter = express.Router();

// Временное хранилище на сервере
const upload = multer({ dest: 'uploads/' });

imagesRouter.post('/upload/:folder(*)', upload.single('image'), imageController.uploadImage);
imagesRouter.get('/:folder(*)', upload.single('image'), imageController.getImages);

export default imagesRouter;