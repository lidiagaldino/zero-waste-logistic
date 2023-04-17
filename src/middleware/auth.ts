
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'
import { IPayload } from "../interfaces/Jwt";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autotizado' })
    }


    const [, token] = authorization.split(" ")
    console.log(token);

    try {
        const data = jwt.verify(token, 'secret')

        req.user = data as IPayload

        return next()

    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' })
    }
}