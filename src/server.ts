import app from "./app";
import jwt, { JwtPayload } from "jsonwebtoken";
import normalizePort from "./utils/normalizePort";

import CollectorStatus from "./services/CollectorStatus";
import { Socket } from "socket.io";
import { IPayload } from "./interfaces/Jwt";

const port = normalizePort(process.env.PORT || "3000");

app.io.on("connection", async (socket) => {
  console.log(`CLIENTE CONECTADO ${socket.id}`);

  let decoded: IPayload;

  if (!socket.handshake.auth || !socket.handshake.auth.token)
    socket.disconnect();

  try {
    decoded = jwt.verify(socket.handshake.auth.token, "secret") as IPayload;
    console.log(decoded);
  } catch (error) {
    socket.emit("InvalidToken", "token invalido");
    socket.disconnect();
  }

  try {
    if (decoded.user_type === "CATADOR") {
      socket.join(`catador_${decoded.id_modo}`);
      console.log("catador");
      const status = await CollectorStatus.onlineCollector(
        Number(decoded.id_modo)
      );
      if (!status) socket.disconnect();
      //return null;
    }

    if (decoded.user_type === "GERADOR") {
      socket.join(`gerador_${decoded.id_modo}`);
      console.log("gerador");
      //return null;
    }
  } catch (error) {
    socket.disconnect();
  }

  socket.on("newOrder", (order) => {
    socket.broadcast.emit("newOrder", order);
  });

  socket.on("acceptOrder", (order) => {
    socket.broadcast.emit("acceptOrder", order);
  });

  socket.on("orderError", (order) => {
    socket.broadcast.emit("orderError", order);
  });

  socket.on("finishOrder", (order) => {
    socket.broadcast.emit("finishOrder", order);
  });

  socket.on("disconnect", async () => {
    console.log("euu");
    if (decoded.user_type == "CATADOR") {
      console.log("disconnect");
      await CollectorStatus.offlineCollector(decoded.id_modo);
    }
  });
});

app.httpServer.listen(port, () => console.log("App rodando"));
