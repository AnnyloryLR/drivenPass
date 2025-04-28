import { Router } from 'express';

const usersRouter = Router();

usersRouter.post("/sign-up");
usersRouter.post("/sign-in");


export default usersRouter;