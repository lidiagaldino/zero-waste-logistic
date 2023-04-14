import app from './app'
import jwt, { JwtPayload } from 'jsonwebtoken'
import normalizePort from './utils/normalizePort'
import { IPayload } from './interfaces/Jwt'

const port = normalizePort(process.env.PORT || '3000')

app.io.on('connection', async socket => {
    console.log(`CLIENTE CONECTADO ${socket.id}`)

    let decoded: IPayload

    if (!socket.handshake.auth || !socket.handshake.auth.token) socket.disconnect()

    decoded = jwt.verify(socket.handshake.auth.token, 'secret') as IPayload
    console.log(decoded);

    if (decoded.user_type === 'CATADOR') {
        socket.join(`catador_${decoded.id_modo}`)
        console.log('catador')
        return null
    }

    if (decoded.user_type === 'GERADOR') {
        socket.join(`gerador_${decoded.id_modo}`)
        console.log('gerador')
        return null
    }

    socket.on('pedidoCriado', (pedido) => {
        // Enviar notificação para o entregador informando que um novo pedido foi criado
        socket.broadcast.emit('novoPedido', pedido);
    });

    // Defina um evento personalizado para quando um pedido for aceito
    socket.on('pedidoAceito', (pedido) => {
        // Enviar notificação para o cliente informando que o pedido foi aceito
        socket.broadcast.emit('pedidoAceito', pedido);
    });
})

app.httpServer.listen(port, () => console.log('App rodando'))