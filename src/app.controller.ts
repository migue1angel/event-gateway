import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from './config/services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Get('event-seed')
  eventSeed() {
    return this.client.send('eventSeed', {});
  }
}
