import { Router } from "express";
import { validation } from "../middleware/validation";
import { authBodyValidation } from "../schemas/authSchema";
import UserController from "../controllers/UserController";

const routes = Router();

routes.post(
  "/auth",
  validation({ body: authBodyValidation }),
  UserController.auth
);

export default routes;
