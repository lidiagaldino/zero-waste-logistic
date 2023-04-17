import { Router } from "express";
import { validation } from "../middleware/validation";
import { orderBodyValidation } from "../schemas/orderSchema";
import { auth } from "../middleware/auth";
import orderController from "../controllers/orderController";
import app from "../app";
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
  (req, res) => {
    app.io.emit("denyOrder", req.body);
    res.send("deny");
  }
);

export default routes;
