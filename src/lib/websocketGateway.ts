import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'orders',
})
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  pushOrderUpdate(orderId: string, status: string): void {
    this.server.emit('orderUpdate', { orderId, status });
  }
}
