import { Catador } from "@prisma/client";
import IUser from "../interfaces/User";
import prisma from "../lib/db";

class FindByEmail {
  public async findByEmail(email: string): Promise<IUser | false> {
    const user = await prisma.usuario.findFirst({
      where: {
        email,
      },
      include: {
        catador: true,
        gerador: true,
      },
    });

    return user ? user : false;
  }
}

export default new FindByEmail();
