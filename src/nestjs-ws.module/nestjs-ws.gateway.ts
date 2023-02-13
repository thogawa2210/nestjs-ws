import { RedisIoAdapter } from './redis.adapter';
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import {OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WSHandler } from 'src/wshandler';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
@Injectable()
export class NestWsGateway implements OnGatewayConnection {
  constructor(){
    WSHandler.adapters.push(RedisIoAdapter);
  }

  @WebSocketServer()
  server: Server;

  sendData(message: string) {
    this.server.emit('EmitData', message);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log(`client ${client.handshake.headers.origin} is connecting on websocket`);
  }
}
