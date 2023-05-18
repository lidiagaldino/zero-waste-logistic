import { Router } from "express";
import { auth } from "../middleware/auth";
import { isGerador } from "../middleware/isGerador";
import { validation } from "../middleware/validation";
import { ratingBodyValidation } from "../schemas/ratingSchema";
import RatingController from "../controllers/RatingController";
import { verifyRatingGerador } from "../middleware/verifyRatingGerador";

const routes = Router();

routes.post(
  "/",
  auth,
  isGerador,
  validation({ body: ratingBodyValidation }),
  verifyRatingGerador,
  RatingController.rating
);

routes.put(
  "/",
  auth,
  isGerador,
  validation({ body: ratingBodyValidation }),
  RatingController.update
);

routes.get("/:id", RatingController.average);

routes.get("/my/:id", auth, isGerador, RatingController.findRatingByGerador);

export default routes;
