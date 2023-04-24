import { Router } from "express";
import { validation } from "../middleware/validation";
import { orderBodyValidation } from "../schemas/orderSchema";
import { auth } from "../middleware/auth";
import orderController from "../controllers/OrderController";
import app from "../app";
import Queue from "../repository/Queue";
import { isCatador } from "../middleware/isCatador";
const routes = Router();

routes.post(
  "/",
  validation({ body: orderBodyValidation }),
  auth,
  orderController.store
);

routes.put("/:id", auth, isCatador, orderController.update);

routes.put("/deny/:id", auth, isCatador, orderController.denyOrder);

export default routes;
