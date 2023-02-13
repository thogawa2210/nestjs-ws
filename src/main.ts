import { WSHandler } from './wshandler';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  WSHandler.adapters.forEach(async (adapter) => {
    const redisIoAdapter = new adapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
  });

  await app.listen(6969);

  console.log(`Starting up on 6969 port`);
}
bootstrap();
