import { Router } from "express";
import { auth } from "../middleware/auth";
import CouponController from "../controllers/CouponController";
import { verifyPontos } from "../middleware/verifyPontos";
const routes = Router();

routes.get("/", CouponController.index);

routes.post("/:id", auth, verifyPontos, CouponController.reedem);

routes.get("/pontos", auth, CouponController.pontos);

routes.get("/unique/:id", CouponController.getCouponById);

routes.get("/reedem", auth, CouponController.getReedemCoupons);

routes.get("/unreedem", auth, CouponController.getUnreedemCoupons);

export default routes;
