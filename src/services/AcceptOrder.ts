import prisma from "../lib/db"

class AcceptOrder {
    public async acceptOrder(id: string, id_catador: string){
        try {
            const pedido = await prisma.pedido.update({
                where: {
                    id
                },
                data: {
                    status: 'em andamento',
                    id_catador
                } 
            })

            return pedido

        } catch (error) {
            return false
        }        
    }
}

export default new AcceptOrder()