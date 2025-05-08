import express, { Request, Response, json } from 'express';
import cors from 'cors';
import authenticationRouter from './routers/auth-router';
import credentialsRouter from './routers/credentials-router';
import eraseRouter from './routers/erase-router';
import errorHandler from './middlewares/errorHandler-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("I'm ok!");
});

app.use(authenticationRouter);
app.use(credentialsRouter);
app.use(eraseRouter);
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is up and running on port ${port}!`));