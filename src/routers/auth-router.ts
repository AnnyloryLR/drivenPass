import { Router } from 'express';
import { schemaValidate } from 'middlewares/schema-middleware';
import { signInSchema, signUpSchema } from 'schemas/user-schema';

const usersRouter = Router();

usersRouter.post("/sign-up", schemaValidate(signUpSchema));
usersRouter.post("/sign-in", schemaValidate(signInSchema));

export default usersRouter;