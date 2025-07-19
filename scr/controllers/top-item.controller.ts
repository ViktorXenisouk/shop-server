import { RequestHandler } from 'express';
import { TopItemService } from '../services/top-item.service';

class TopItemController {
  constructor(private topItemService: TopItemService) { }

  public Create: RequestHandler = async (req, res) => {
    const payload = req.body
    const { status, ...other } = await this.topItemService.Create(payload)

    res.status(status).json({ ...other })
  }
  public Find: RequestHandler = async (req, res) => {
    const category = req.params.category as string;
    const type = req.query.type as string;

    const { status, ...other } = await this.topItemService.Find(category, type)

    res.status(status).json({ ...other })
  }
  public Update: RequestHandler = async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const { status, ...other } = await this.topItemService.Update(id, payload)

    res.status(status).json({ ...other })
  }
  public Delete: RequestHandler = async (req, res) => {
    const id = req.params.id
    const { status, ...other } = await this.topItemService.Delete(id)

    res.status(status).json({ ...other })
  }
}

export { TopItemController }