import { WSHandler } from './wshandler';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  if (WSHandler.adapter) {
    WSHandler.useAdapter(app);
  }

  await app.listen(6969);

  console.log(`Starting up on 6969 port`);
}
bootstrap();
