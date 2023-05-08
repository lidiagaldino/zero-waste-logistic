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
import IOrderData from "../interfaces/OrderData";
import FindCollector from "../services/FindCollector";

class OrderController {
  public async store(req: Request<{}, {}, Omit<IOrder, "id">>, res: Response) {
    const body = req.body;

    const order: IOrderData = (await CreateOrder.createOrder(
      body
    )) as IOrderData;

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

      order.distancia = createQueue[0].distancia;

      await CollectorStatus.busyCollector(createQueue[0].id_catador);
      app.io.to(`catador_${createQueue[0].id_catador}`).emit("newOrder", order);
      return res.status(StatusCodes.CREATED).json(order);
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Não foi possível cadastrar o pedido" });
  }

  public async storeWithSpecificCollector(
    req: Request<TParams, {}, Omit<IOrder, "id">>,
    res: Response
  ) {
    const { id } = req.params;
    const body = req.body;

    const isCollectorBusy = await FindCollector.findCollector(Number(id));

    if (isCollectorBusy.id_status_catador != 1) {
      app.io
        .to(`gerador_${body.id_gerador}`)
        .emit("orderError", "Catador não está disponível");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Catador não está disponível" });
    }

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
        queue = (await FindNearestCollector.getDistance(
          Number(id),
          body.id_endereco
        )) as { id_catador: number; distancia: number }[];

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

      order.distancia = createQueue[0].distancia;

      await CollectorStatus.busyCollector(createQueue[0].id_catador);
      app.io.to(`catador_${createQueue[0].id_catador}`).emit("newOrder", order);
      return res.status(StatusCodes.CREATED).json(order);
    }
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
    await CollectorStatus.finishedOrder(Number(id));
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
        await CollectorStatus.finishedOrder(result.id_catador);
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

  public async cancelOrder(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;

    const order = await FindOrder.findOrder(Number(id));

    const rs = await AcceptOrder.cancelOrder(
      Number(id),
      order ? order.id_catador : null
    );

    if (rs && order) {
      app.io
        .to(`catador_${order.id_catador}`)
        .emit("canceledOrder", "Pedido foi cancelado pelo cliente");

      return res.status(StatusCodes.NO_CONTENT).json({});
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Algo deu errado" });
  }

  public async verifyCatadorQueue(req: Request, res: Response) {
    const { id_modo } = req.user;

    const rs = await Queue.findCollectorQueue(id_modo);

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Não existem pedidos pendentes" });
  }

  public async getOrderByGerador(req: Request, res: Response) {
    const { id_modo } = req.user;

    const rs = await FindOrder.findOrderByGerador(id_modo);

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({ message: "NOT_FOUND" });
  }
}

export default new OrderController();
