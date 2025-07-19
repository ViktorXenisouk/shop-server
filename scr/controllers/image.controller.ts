import { RequestHandler } from 'express';
import { ImageService } from '../services/image.service';

class ImageController {
  constructor(private imageService: ImageService) { }

  public uploadImage: RequestHandler = async (req, res)=>{
  const file = req.file;
  const folder = req.params.folder ?? undefined

  const {status,...other} = await this.imageService.uploadImage(file,folder)

  res.status(status).json({...other})
  }

  public getImages: RequestHandler = async (req, res)=>{
      const folder = req.params.folder
  const {status,...other} = await this.imageService.getImages(folder)

  res.status(status).json({...other})
  }
}

export {ImageController}