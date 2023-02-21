import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { INestApplicationContext, Injectable } from '@nestjs/common';

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);

    const pubClient = createClient({ url: `redis://172.25.42.251:6379`, password: 'thogia123'});
    const subClient = pubClient.duplicate();

    pubClient.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    subClient.on('error', (_error) => {
      // console.error('Redis connection error:', error);
    });

    Promise.all([pubClient.connect(), subClient.connect()])
      .then(async () => {
        this.adapterConstructor = createAdapter(pubClient, subClient);
        console.log('Connected to Redis');

        server.adapter(this.adapterConstructor);

        // Set a key-value pair in Redis
        let x = await pubClient.set('test', 'hello');
        let data = await pubClient.get('test').catch((err) => console.error(err));
        if (data) console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });

    return server;
  }
}
