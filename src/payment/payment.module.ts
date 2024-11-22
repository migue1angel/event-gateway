import { Module } from '@nestjs/common';
import { RegisterService } from './payment.service';
import { RegisterController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { TokenInjectionEnum } from 'src/shared/enums/token-injection.enum';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [
    ClientsModule.register([
      {
        name: TokenInjectionEnum.EVENT_SERVICE,
        transport: Transport.TCP,
        options: { port: envs.PAYMENT_MS_PORT, host: envs.PAYMENT_MS_HOST },
      },
    ]),
  ],
})
export class PaymentModule {}
