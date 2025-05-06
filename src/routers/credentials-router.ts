import { Router } from 'express';
import { tokenValidate } from 'middlewares/auth-middleware';
import { schemaValidate } from 'middlewares/schema-middleware';
import { credentialSchema } from 'schemas/credentials-schema';

const credentialsRouter = Router();

credentialsRouter.use(tokenValidate)
credentialsRouter.post("/credentials", schemaValidate(credentialSchema));
credentialsRouter.get("/credentials");
credentialsRouter.put("/credentials/:id", schemaValidate(credentialSchema));
credentialsRouter.delete("/credentials/:id");

export default credentialsRouter;