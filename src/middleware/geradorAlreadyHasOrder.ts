import { NextFunction, Request, Response } from "express";

export const geradorAlreadyHasOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id_modo } = req.user


}