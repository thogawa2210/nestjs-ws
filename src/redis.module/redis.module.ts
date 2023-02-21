import { INestApplicationContext, Module } from '@nestjs/common';
import { WSHandler } from 'src/wshandler';
import { RedisIoAdapter } from './redis.adapter';

@Module({
  providers: [],
  exports: [],
})
export class RedisIoModule {
  constructor(){
    WSHandler.adapter = RedisIoAdapter;
  }
}