import { credentialUpdate, deleteCredential, getAllCredentials, getCredentialById, newCredential } from 'controllers/credentials-controller';
import { Router } from 'express';
import { tokenValidate } from '../middlewares/auth-middleware';
import { schemaValidate } from '../middlewares/schema-middleware';
import { credentialSchema } from '../schemas/credentials-schema';

const credentialsRouter = Router();

credentialsRouter.use(tokenValidate)
credentialsRouter.post("/credentials", schemaValidate(credentialSchema), newCredential);
credentialsRouter.get("/credentials", getAllCredentials);
credentialsRouter.get("/credentials/:id", getCredentialById);
credentialsRouter.put("/credentials/:id", schemaValidate(credentialSchema), credentialUpdate);
credentialsRouter.delete("/credentials/:id", deleteCredential);

export default credentialsRouter;