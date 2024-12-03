import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { PaymentSessionDto } from './dto/payment.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create-order')
  async create(@Body() paymentSessionDto: PaymentSessionDto) {
    return await firstValueFrom(
      this.client.send('createOrder', paymentSessionDto),
    );
  }
  @Post(':id/capture-order')
  async capture(@Param('id') id: string) {
    return await firstValueFrom(
      this.client.send('captureOrder', id ),
    );
  }
}
