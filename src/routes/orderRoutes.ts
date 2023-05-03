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
const routes = Router();

routes.post(
  "/",
  validation({ body: orderBodyValidation }),
  auth,
  geradorAlreadyHasOrder,
  orderController.store
);

routes.put(
  "/:id",
  auth,
  isCatador,
  verifyOrderStatus(1),
  verifyQueue,
  orderController.update
);

routes.put(
  "/deny/:id",
  auth,
  isCatador,
  verifyQueue,
  orderController.denyOrder
);

routes.put(
  "/finish/:id",
  auth,
  isCatador,
  catadorOrder,
  verifyOrderStatus(2),
  orderController.finishOrder
);

export default routes;
