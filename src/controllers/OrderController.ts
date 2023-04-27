import { Request, Response } from "express";
import IOrder from "../interfaces/Order";
import CreateOrder from "../services/CreateOrder";
import app from "../app";
import FindNearestCollector from "../services/FindNearestCollector";
import { StatusCodes } from "http-status-codes";
import TParams from "../interfaces/Params";
import AcceptOrder from "../services/AcceptOrder";
import FindOrder from "../services/FindOrder";
import Queue from "../services/Queue";

class OrderController {
  public async store(req: Request<{}, {}, Omit<IOrder, "id">>, res: Response) {
    const body = req.body;

    const order = await CreateOrder.createOrder(body);

    if (order) {
      const queue: { id_catador: number; distancia: number }[] =
        (await FindNearestCollector.findNearestCollector(
          body.id_endereco,
          body.id_materiais
        )) as {
          id_catador: number;
          distancia: number;
        }[];

      const createQueue = await Queue.storeQueue(queue, order.id);
      console.log(createQueue);
      if (!createQueue) {
        await CreateOrder.deleteOrder(order.id);
        return res.send("ada");
      }

      app.io.to(`catador_${createQueue[0].id_catador}`).emit("newOrder", order);
      return res.status(StatusCodes.CREATED).json(order);
    }

    return res.send(order);
  }

  public async update(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;

    if (!req.user.id_modo)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errorsResult: "ID do catador é necessário" });

    const updateOrder = await AcceptOrder.acceptOrder(
      Number(id),
      req.user.id_modo
    );

    if (updateOrder) {
      app.io
        .to(`gerador_${updateOrder.id_gerador}`)
        .emit("acceptOrder", updateOrder);
      app.io.to(`catador_${req.user.id_modo}`).emit("acceptOrder", updateOrder);
      return res.status(StatusCodes.OK).json(updateOrder);
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Algo deu errado" });
  }

  public async denyOrder(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;

    const order = await FindOrder.findOrder(Number(id));

    if (!order)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errorsResult: "Pedido não existe" });

    Queue.deleteFromQueueById(req.user.id_modo, Number(id));
    const queue = Queue.getQueue(Number(id));

    app.io.to(`catador_${queue[0]}`).emit("newOrder", order);
    return res.status(StatusCodes.OK).json({});
  }
}

export default new OrderController();
