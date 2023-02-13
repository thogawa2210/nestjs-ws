import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  
  
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  
}
