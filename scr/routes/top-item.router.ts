import { Router } from 'express';
import { TopItemService } from '../services/top-item.service';
import {TopItemController} from '../controllers/top-item.controller';

const topItemService = new TopItemService()
const topItemController = new TopItemController(topItemService)

const topItemRouter = Router();

topItemRouter.get('/:category(*)', topItemController.Find);
topItemRouter.post('/', topItemController.Create);
topItemRouter.put('/:id', topItemController.Update);
topItemRouter.delete('/:id', topItemController.Delete);

export default topItemRouter;