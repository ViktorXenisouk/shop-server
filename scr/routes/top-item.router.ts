import { Router } from 'express';
import { TopItemService } from '../services/top-item.service';
import {TopItemController} from '../controllers/top-item.controller';

const topItemService = new TopItemService()
const topItemController = new TopItemController(topItemService)

const topItemRouter = Router();

topItemRouter.get('/:category(*)', topItemController.find);
topItemRouter.post('/', topItemController.create);
topItemRouter.put('/:id', topItemController.update);
topItemRouter.delete('/:id', topItemController.delete);

export default topItemRouter;