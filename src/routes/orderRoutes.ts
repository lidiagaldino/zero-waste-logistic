import { Router } from "express";
import { validation } from "../middleware/validation";
import { orderBodyValidation } from "../schemas/orderSchema";
import { auth } from "../middleware/auth";
import orderController from "../controllers/OrderController";
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

routes.put("/finish/:id", auth, isCatador, orderController.finishOrder);

export default routes;
