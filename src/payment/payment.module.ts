import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE', // Changed from EVENT_SERVICE
        transport: Transport.TCP,
        options: {
          host: process.env.PAYMENT_MS_HOST,
          port: parseInt(process.env.PAYMENT_MS_PORT),
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}