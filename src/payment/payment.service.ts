import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly client: ClientProxy
  ) {}

  async create(createRegisterDto: CreateRegisterDto) {
    console.log('Payment Service sending createPayment message:', createRegisterDto);
    return firstValueFrom(
      this.client.send('createPayment', createRegisterDto)
    );
  }

  async findAll() {
    console.log('Payment Service sending findAllPayments message');
    return firstValueFrom(
      this.client.send('findAllPayments', {})
    );
  }

  async findOne(id: number) {
    console.log('Payment Service sending findOnePayment message:', id);
    return firstValueFrom(
      this.client.send('findOnePayment', id)
    );
  }

  async update(id: number, updateRegisterDto: UpdateRegisterDto) {
    console.log('Payment Service sending updatePayment message:', { id, updateRegisterDto });
    return firstValueFrom(
      this.client.send('updatePayment', { id, updatePaymentDto: updateRegisterDto })
    );
  }

  async remove(id: number) {
    console.log('Payment Service sending removePayment message:', id);
    return firstValueFrom(
      this.client.send('removePayment', id)
    );
  }
}