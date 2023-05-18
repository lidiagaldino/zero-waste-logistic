import { Request, Response } from "express";
import Coupon from "../services/Coupon";
import { StatusCodes } from "http-status-codes";
import TParams from "../interfaces/Params";

class CouponController {
  public async index(_req: Request, res: Response) {
    const cupom = await Coupon.getCoupons();

    return cupom
      ? res.status(StatusCodes.OK).json(cupom)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }

  public async pontos(req: Request, res: Response) {
    const { id_usuario } = req.user;

    const pontos = await Coupon.getPontos(id_usuario);

    return res.status(StatusCodes.OK).json(pontos);
  }

  public async reedem(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;
    const { id_usuario } = req.user;

    const verifyReedem = Coupon.verifyReedem(Number(id), id_usuario);

    if (!verifyReedem) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Você já resgatou esse cupom" });
    }

    const reedem = await Coupon.reedem(Number(id), id_usuario);

    return reedem
      ? res.status(StatusCodes.OK).json(reedem)
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
  }

  public async getUnreedemCoupons(req: Request, res: Response) {
    const { id_usuario } = req.user;

    const rs = await Coupon.getUnredeemedCoupon(id_usuario);

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }

  public async getReedemCoupons(req: Request, res: Response) {
    const { id_usuario } = req.user;

    console.log(id_usuario);
    const rs = await Coupon.getReedemCoupons(id_usuario);

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }

  public async getCouponById(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;

    const rs = await Coupon.getCouponById(Number(id));

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }
}

export default new CouponController();
