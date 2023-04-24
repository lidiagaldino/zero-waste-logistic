import prisma from "../lib/db";

class CollectorStatus {
  public async onlineCollector(id: number) {
    try {
      const rs = await prisma.catador.update({
        where: {
          id,
        },
        data: {
          status: "available",
        },
      });

      return rs;
    } catch (error) {
      return false;
    }
  }

  public async busyCollector(id: number) {
    try {
      const rs = await prisma.catador.update({
        where: {
          id,
        },
        data: {
          status: "busy",
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
          status: "unavailable",
        },
      });

      return rs;
    } catch (error) {
      return false;
    }
  }
}

export default new CollectorStatus();
