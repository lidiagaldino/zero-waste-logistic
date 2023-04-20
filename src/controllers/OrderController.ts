import { Request, Response } from "express";
import IOrder from "../interfaces/Order";
import CreateOrder from "../services/CreateOrder";
import app from "../app";
import FindNearestCollector from "../services/FindNearestCollector";
import { StatusCodes } from "http-status-codes";
import Queue from "../repository/Queue";
import TParams from "../interfaces/Params";
import AcceptOrder from "../services/AcceptOrder";

class OrderController {
  public async store(req: Request<{}, {}, Omit<IOrder, "id">>, res: Response) {
    const body = req.body;

    const order = await CreateOrder.createOrder(body);

    if (order) {
      const queue: { id: number }[] =
        (await FindNearestCollector.findNearestCollector(body.id_endereco)) as {
          id: number;
        }[];

      let list: number[] = [];

      queue.map((item) => {
        console.log(item.id);
        list.push(item.id);
      });

      Queue.setQueue(list);

      app.io.to(`catador_${list[0]}`).emit("newOrder", order);
      return res.status(StatusCodes.CREATED).json(order);
    }

    return res.send(order);
  }

  public async update(
    req: Request<TParams, {}, Omit<IOrder, "id">>,
    res: Response
  ) {
    const { id } = req.params;
    const body = req.body;

    if (!body.id_catador)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errorsResult: "ID do catador é necessário" });

    const updateOrder = await AcceptOrder.acceptOrder(
      Number(id),
      body.id_catador
    );

    if (updateOrder) {
      app.io.to(`gerador_${body.id_gerador}`).emit("acceptOrder", updateOrder);
      return res.status(StatusCodes.OK).json(updateOrder);
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Algo deu errado" });
  }

  public async denyOrder(req: Request<TParams, {}, IOrder>, res: Response) {
    const body = req.body;

    Queue.deleteFromQueueById(body.id_catador);
    const queue = Queue.getQueue();

    body.id_catador = null;
    app.io.to(`catador_${queue[0]}`).emit("newOrder", body);
    return res.status(StatusCodes.OK).json({});
  }
}

export default new OrderController();
