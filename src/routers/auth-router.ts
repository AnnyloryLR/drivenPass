import { signIn, signUp } from '../controllers/users-controller';
import { Router } from 'express';
import { schemaValidate } from '../middlewares/schema-middleware';
import { signInSchema, signUpSchema } from '../schemas/user-schema';

const authenticationRouter = Router();

authenticationRouter.post("/sign-up", schemaValidate(signUpSchema), signUp);
authenticationRouter.post("/sign-in", schemaValidate(signInSchema), signIn);

export default authenticationRouter;