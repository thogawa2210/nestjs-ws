import { INestApplicationContext } from '@nestjs/common';

export class WSHandler {
  static adapter: any;

  static async useAdapter(app: INestApplicationContext | any) {
    const adapter = new WSHandler.adapter(app);
    app.useWebSocketAdapter(adapter);
  }
}
