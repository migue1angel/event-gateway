import { Body, Controller, Get, Inject, Param, Post, Put, Delete, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    this.logger.log(`Enviando solicitud de creación de orden: ${JSON.stringify(createOrderDto)}`);
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  findAll() {
    this.logger.log('Solicitando todas las órdenes');
    return this.client.send('findAllOrders', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Solicitando orden con ID: ${id}`);
    return this.client.send('findOneOrder', id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    this.logger.log(`Actualizando orden con ID: ${id}`);
    return this.client.send('updateOrder', { id, ...updateOrderDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Eliminando orden con ID: ${id}`);
    return this.client.send('removeOrder', id);
  }
}

