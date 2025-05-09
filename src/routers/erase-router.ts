import errorHandler from '../middlewares/errorHandler-middleware';
import { eraseAccount } from '../controllers/erase-controller';
import { Router } from 'express';

const eraseRouter = Router();

eraseRouter.use(errorHandler)
eraseRouter.delete("/delete", eraseAccount);

export default eraseRouter;