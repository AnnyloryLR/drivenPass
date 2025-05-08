import { eraseAccount } from '../controllers/erase-controller';
import { Router } from 'express';

const eraseRouter = Router();

eraseRouter.delete("/delete", eraseAccount);

export default eraseRouter;