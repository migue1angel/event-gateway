import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TokenInjectionEnum } from 'src/shared/enums/token-injection.enum';
import { envs } from 'src/config/envs';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    ClientsModule.register([
      {
        name: TokenInjectionEnum.EVENT_SERVICE,
        transport: Transport.TCP,
        options: { port: envs.EVENT_MS_PORT, host: envs.EVENT_MS_HOST },
      },
    ]),
  ],
})
export class EventModule {}
