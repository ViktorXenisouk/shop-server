import { RequestHandler } from 'express';
import { TopItemService } from '../services/top-item.service';

class TopItemController {
  constructor(private topItemService: TopItemService) { }

  public create: RequestHandler = async (req, res) => {
    const payload = req.body
    const { status, ...other } = await this.topItemService.create(payload)

    res.status(status).json({ ...other })
  }
  public find: RequestHandler = async (req, res) => {
    const category = req.params.category as string;
    const type = req.query.type as string;

    const { status, ...other } = await this.topItemService.find(category, type)

    res.status(status).json({ ...other })
  }
  public update: RequestHandler = async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const { status, ...other } = await this.topItemService.update(id, payload)

    res.status(status).json({ ...other })
  }
  public delete: RequestHandler = async (req, res) => {
    const id = req.params.id
    const { status, ...other } = await this.topItemService.delete(id)

    res.status(status).json({ ...other })
  }
}

export { TopItemController }