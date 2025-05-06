import { Router } from 'express';
import { schemaValidate } from 'middlewares/schema-middleware';
import { signInSchema, signUpSchema } from 'schemas/user-schema';

const authenticationRouter = Router();

authenticationRouter.post("/sign-up", schemaValidate(signUpSchema));
authenticationRouter.post("/sign-in", schemaValidate(signInSchema));

export default authenticationRouter;