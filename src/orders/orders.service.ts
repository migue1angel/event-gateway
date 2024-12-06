import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@Inject(NATS_SERVICE) private client: ClientProxy) {}

  async create(createOrderDto: CreateOrderDto) {
    return firstValueFrom(this.client.send('createOrder', createOrderDto));
  }

  async findAll() {
    return firstValueFrom(this.client.send('findAllOrders', {}));
  }

  async findOne(id: string) {
    return firstValueFrom(this.client.send('findOneOrder', id));
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return firstValueFrom(this.client.send('updateOrder', { id, ...updateOrderDto }));
  }

  async remove(id: string) {
    return firstValueFrom(this.client.send('removeOrder', id));
  }
}

