import { Request, Response } from "express";
import Rating from "../services/Rating";
import IRating from "../interfaces/Rating";
import { StatusCodes } from "http-status-codes";
import TParams from "../interfaces/Params";

class RatingControlller {
  public async rating(
    req: Request<{}, {}, Omit<IRating, "id">>,
    res: Response
  ) {
    const { id_modo } = req.user;
    const rs = await Rating.rating(req.body, id_modo);

    return rs
      ? res.status(StatusCodes.CREATED).json(rs)
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Não foi possível criar" });
  }

  public async average(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;

    const result = await Rating.average(Number(id));

    return result
      ? res.status(StatusCodes.OK).json(result)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }

  public async update(
    req: Request<{}, {}, Omit<IRating, "id">>,
    res: Response
  ) {
    const { id_modo } = req.user;

    const result = await Rating.update(req.body, id_modo);

    return result
      ? res.status(StatusCodes.OK).json(result[0])
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
  }

  public async findRatingByGerador(
    req: Request<TParams, {}, {}>,
    res: Response
  ) {
    const { id_modo } = req.user;
    const { id } = req.params;

    const result = await Rating.findRatingByGerador(id_modo, Number(id));

    return result
      ? res.status(StatusCodes.OK).json(result[0])
      : res.status(StatusCodes.NOT_FOUND).json({});
  }
}

export default new RatingControlller();
