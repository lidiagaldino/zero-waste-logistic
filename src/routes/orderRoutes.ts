import { Router } from "express";
import { validation } from "../middleware/validation";
import { orderBodyValidation } from "../schemas/orderSchema";
import { auth } from "../middleware/auth";
import orderController from "../controllers/OrderController";
import app from "../app";
import Queue from "../repository/Queue";
const routes = Router();

routes.post(
  "/",
  validation({ body: orderBodyValidation }),
  auth,
  orderController.store
);

routes.put(
  "/:id",
  validation({ body: orderBodyValidation }),
  auth,
  orderController.update
);

routes.put(
  "/deny/:id",
  validation({ body: orderBodyValidation }),
  auth,
  orderController.denyOrder
);

export default routes;
