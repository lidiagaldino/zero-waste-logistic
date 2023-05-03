import prisma from "../lib/db";

class CollectorStatus {
  public async onlineCollector(id: number) {
    try {
      const checkBusy = await prisma.pedido.findMany({
        where: {
          id_catador: id,
          id_status: {
            not: 3,
          },
        },
      });

      if (checkBusy.length > 0) {
        return true;
      }

      const rs = await prisma.catador.update({
        where: {
          id,
        },
        data: {
          id_status_catador: 1,
        },
      });

      return rs;
    } catch (error) {
      return false;
    }
  }

  public async busyCollector(id: number) {
    try {
      const checkBusy = await prisma.pedido.findMany({
        where: {
          id_catador: id,
          id_status: {
            not: 3,
          },
        },
      });

      if (checkBusy.length > 0) {
        return true;
      }

      const rs = await prisma.catador.update({
        where: {
          id,
        },
        data: {
          id_status_catador: 3,
        },
      });

      return rs;
    } catch (error) {
      return false;
    }
  }

  public async offlineCollector(id: number) {
    try {
      const rs = await prisma.catador.update({
        where: {
          id,
        },
        data: {
          id_status_catador: 2,
        },
      });

      return rs;
    } catch (error) {
      return false;
    }
  }
}

export default new CollectorStatus();
