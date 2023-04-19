import app from "./app";
import jwt, { JwtPayload } from "jsonwebtoken";
import normalizePort from "./utils/normalizePort";

import Queue from "./repository/Queue";

interface IPayload extends JwtPayload {
  id_usuario: string;
  id_modo: string;
  user_type: "CATADOR" | "GERADOR";
}

const port = normalizePort(process.env.PORT || "3000");

app.io.on("connection", async (socket) => {
  console.log(`CLIENTE CONECTADO ${socket.id}`);

  let decoded: IPayload;

  if (!socket.handshake.auth || !socket.handshake.auth.token)
    socket.disconnect();

  try {
    decoded = jwt.verify(socket.handshake.auth.token, "secret") as IPayload;
  } catch (error) {
    socket.disconnect();
  }

  console.log(decoded.id_modo);

  if (decoded.user_type === "CATADOR") {
    socket.join(`catador_${decoded.id_modo}`);
    console.log("catador");
    return null;
  }

  if (decoded.user_type === "GERADOR") {
    socket.join(`gerador_${decoded.id_modo}`);
    console.log("gerador");
    return null;
  }

  socket.on("newOrder", (order) => {
    socket.broadcast.emit("newOrder", order);
  });

  socket.on("acceptOrder", (order) => {
    socket.broadcast.emit("acceptOrder", order);
  });

  socket.on("denyOrder", (order) => {
    if (decoded.user_type != "CATADOR") return null;

    // Queue.deleteFromQueueById({ id: order.id_catador });
    // const queue = Queue.getQueue();
    // console.log(queue[0]);
    // socket.to(`catador_${queue[0].id}`).emit("newOrder", order);
  });
});

app.httpServer.listen(port, () => console.log("App rodando"));
