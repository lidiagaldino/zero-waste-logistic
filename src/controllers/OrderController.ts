import { Request, Response } from "express";
import IOrder from "../interfaces/Order";
import CreateOrder from "../services/CreateOrder";
import app from "../app";
import FindNearestCollector from "../services/FindNearestCollector";
import { StatusCodes } from "http-status-codes";

class OrderController {
    public async store(req: Request<{}, {}, Omit<IOrder, 'id'>>, res: Response){
        const body = req.body

        const order = await CreateOrder.createOrder(body)

        if (order) {
            const queue: {id: string} = await FindNearestCollector.findNearestCollector(body.id_endereco) as {id: string}
            app.io.to(`collector_${queue[0].id}`)
            return res.status(StatusCodes.CREATED).json(order)
        }
    }
}

export default new OrderController()