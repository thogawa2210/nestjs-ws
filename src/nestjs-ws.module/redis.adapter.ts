import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  private connecting = false;
  private connected = false;

  async connectToRedis(): Promise<void> {
    // Địa chỉ Redis
    const pubClient = createClient({
      url: `redis://172.24.119.119:6379`,
      password: 'thogia123',
    });
    
    const subClient = pubClient.duplicate();

    // Add an error listener to the Redis clients to detect when the connection is lost
    pubClient.on('error', (error) => {
      this.connecting = false;
      this.connected = false;
      setTimeout(() => this.connectToRedis(), 5000);
    });

    subClient.on('error', (error) => {
      this.connecting = false;
      this.connected = false;
      setTimeout(() => this.connectToRedis(), 5000);
    });

    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.connecting = false;
    this.connected = true;

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    if (!this.connecting && !this.connected) {
      this.connectToRedis();
    }

    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
