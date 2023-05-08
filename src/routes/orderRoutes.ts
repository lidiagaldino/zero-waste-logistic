import { Router } from "express";
import { validation } from "../middleware/validation";
import { orderBodyValidation } from "../schemas/orderSchema";
import { auth } from "../middleware/auth";
import orderController from "../controllers/OrderController";
import { isCatador } from "../middleware/isCatador";
import { geradorAlreadyHasOrder } from "../middleware/geradorAlreadyHasOrder";
import { catadorOrder } from "../middleware/catadorOrder";
import { verifyOrderStatus } from "../middleware/verifyOrderStatus";
import { verifyQueue } from "../middleware/verifyQueue";
import { geradorOrder } from "../middleware/geradorOrder";
import { isGerador } from "../middleware/isGerador";
const routes = Router();

routes.post(
  "/",
  validation({ body: orderBodyValidation }),
  auth,
  geradorAlreadyHasOrder,
  orderController.store
);

routes.post(
  "/:id",
  validation({ body: orderBodyValidation }),
  auth,
  isCatador("params"),
  geradorAlreadyHasOrder,
  orderController.storeWithSpecificCollector
);

routes.put(
  "/:id",
  auth,
  isCatador("user"),
  verifyOrderStatus(1),
  verifyQueue,
  orderController.update
);

routes.put(
  "/deny/:id",
  auth,
  isCatador("user"),
  verifyQueue,
  orderController.denyOrder
);

routes.put(
  "/finish/:id",
  auth,
  isCatador("user"),
  catadorOrder,
  verifyOrderStatus(2),
  orderController.finishOrder
);

routes.delete(
  "/cancel/:id",
  auth,
  isGerador,
  geradorOrder,
  verifyOrderStatus(2),
  orderController.cancelOrder
);

routes.get("/", auth, isCatador("user"), orderController.verifyCatadorQueue);

routes.get("/gerador", auth, isGerador, orderController.getOrderByGerador);

export default routes;
