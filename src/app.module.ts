import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestWSModule } from './nestjs-ws.module/nestjs-ws.module';
import { RedisIoModule } from './redis.module/redis.module';

@Module({
  imports: [NestWSModule, RedisIoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
