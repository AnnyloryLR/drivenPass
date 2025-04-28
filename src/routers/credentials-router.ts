import { Router } from 'express';

const credentialsRouter = Router();

credentialsRouter.post("/credentials");
credentialsRouter.get("/credentials");
credentialsRouter.put("/credentials/:id");
credentialsRouter.delete("/credentials/:id");

export default credentialsRouter;