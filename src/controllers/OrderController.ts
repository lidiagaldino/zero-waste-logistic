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
import FinishOrder from "../services/FinishOrder";
import CollectorStatus from "../services/CollectorStatus";

class OrderController {
  public async store(req: Request<{}, {}, Omit<IOrder, "id">>, res: Response) {
    const body = req.body;

    const order = await CreateOrder.createOrder(body);

    if (order) {
      let queue: { id_catador: number; distancia: number }[];
      let createQueue:
        | false
        | {
            id_catador: number;
            id_pedido: number;
            distancia: number;
          }[];

      try {
        queue = (await FindNearestCollector.findNearestCollector(
          body.id_endereco,
          body.id_materiais
        )) as {
          id_catador: number;
          distancia: number;
        }[];

        createQueue = await Queue.storeQueue(queue, order.id);
      } catch (error) {
        await CreateOrder.deleteOrder(order.id);
        app.io
          .to(`gerador_${order.id_gerador}`)
          .emit("orderError", "Não foi possível criar a fila");
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Não foi possível criar a fila" });
      }

      if (!createQueue) {
        await CreateOrder.deleteOrder(order.id);
        app.io
          .to(`gerador_${order.id_gerador}`)
          .emit("orderError", "Não foi possível criar a fila");
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Não foi possível criar a fila" });
      }

      await CollectorStatus.busyCollector(createQueue[0].id_catador);
      app.io.to(`catador_${createQueue[0].id_catador}`).emit("newOrder", order);
      return res.status(StatusCodes.CREATED).json(order);
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Não foi possível cadastrar o pedido" });
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

    console.log(updateOrder);

    if (updateOrder) {
      await CollectorStatus.busyCollector(req.user.id_modo);
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
    await CollectorStatus.onlineCollector(Number(id));
    const queue = await Queue.getQueue(Number(id));

    if (!queue) {
      await CreateOrder.deleteOrder(order.id);
      app.io
        .to(`gerador_${order.id_gerador}`)
        .emit(
          "orderError",
          "Seu pedido teve que ser cancelado pois não existem pessoas disponíveis para atende-lo"
        );
      return res.status(StatusCodes.OK).json({});
    }

    app.io.to(`catador_${queue[0].id_catador}`).emit("newOrder", order);
    return res.status(StatusCodes.OK).json({});
  }

  public async finishOrder(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;

    const result = await FinishOrder.finishOrder(Number(id));

    if (result) {
      const queue = await Queue.deleteQueue(Number(id));

      if (queue) {
        await CollectorStatus.onlineCollector(result.id_catador);
        app.io.to(`gerador_${result.id_gerador}`).emit("finishOrder", result);
        return res.status(StatusCodes.OK).json(result);
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Não foi possível deletar a fila" });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Não foi possível finalizar o pedido" });
  }
}

export default new OrderController();
