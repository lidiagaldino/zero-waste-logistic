import { NextFunction, Request, Response } from "express";
import FindOrder from "../services/FindOrder";
import { StatusCodes } from "http-status-codes";

export const verifyOrderStatus =
  (mode: 1 | 2) => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = (await FindOrder.findOrder(Number(id))) as {
      id_status: number;
    };

    if (order.id_status == mode) {
      return next();
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "O status do pedido não condiz com a ação",
    });
  };
