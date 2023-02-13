import { Module } from '@nestjs/common';
import { NestWsGateway } from './nestjs-ws.gateway';

@Module({
  providers: [NestWsGateway, ],
  exports: [NestWsGateway],
})
export class NestWSModule {}
