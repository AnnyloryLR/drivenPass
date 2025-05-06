import { Request, Response, NextFunction } from "express";
import prisma from "database/config";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function tokenValidate(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if(!token) return res.sendStatus(401);

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) return res.status(401).send(err);

            const user = await prisma.user.findFirst({
                where: {
                       id: decoded.userId
                   }
            });

            if(!user) return res.sendStatus(401);

            res.locals.user = user;

            return next();
        });   

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

