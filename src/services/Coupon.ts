import prisma from "../lib/db";

class Coupon {
  public async getCoupons() {
    const rs = await prisma.cupom.findMany();

    return rs;
  }

  public async getReedemCoupons(id: number) {
    const rs = await prisma.cupom.findMany({
      where: {
        CupomUsuario: {
          some: {
            id_usuario: id,
          },
        },
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async getUnredeemedCoupon(id: number) {
    const rs = await prisma.cupom.findMany({
      where: {
        CupomUsuario: {
          none: {
            id_usuario: id,
          },
        },
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async verifyReedem(id_cupom: number, id_usuario: number) {
    const rs = await prisma.cupomUsuario.findMany({
      where: {
        id_cupom,
        id_usuario,
      },
    });

    return rs ? true : false;
  }

  public async storePontos(id: number, id_gerador: number) {
    try {
      await prisma.usuario.update({
        where: {
          id,
        },
        data: {
          pontos: {
            increment: 10,
          },
        },
      });

      await prisma.usuario.updateMany({
        where: {
          gerador: {
            every: {
              id: id_gerador,
            },
          },
        },
        data: {
          pontos: {
            increment: 10,
          },
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  public async getPontos(id: number) {
    const rs = await prisma.usuario.findUnique({
      where: {
        id,
      },
      select: {
        pontos: true,
      },
    });

    return rs;
  }

  public async verifyPontos(id_cupom: number, id_usuario: number) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id_usuario,
      },
    });

    const cupom = await prisma.cupom.findUnique({
      where: {
        id: id_cupom,
      },
    });

    if (usuario.pontos < cupom.pontos) {
      return false;
    }

    return true;
  }

  public async reedem(id_cupom: number, id_usuario: number) {
    try {
      const rs = await prisma.cupomUsuario.create({
        data: {
          id_cupom,
          id_usuario,
        },
      });

      const cupom = await prisma.cupom.findUnique({
        where: {
          id: id_cupom,
        },
      });

      await prisma.usuario.update({
        where: {
          id: id_usuario,
        },
        data: {
          pontos: {
            decrement: cupom.pontos,
          },
        },
      });

      return cupom;
    } catch (error) {
      return false;
    }
  }

  public async getCouponById(id: number) {
    const rs = await prisma.cupom.findUnique({
      where: {
        id,
      },
    });

    return rs ? rs : false;
  }
}

export default new Coupon();
