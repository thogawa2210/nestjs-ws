import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestWSModule } from './nestjs-ws.module/nestjs-ws.module';

@Module({
  imports: [NestWSModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
