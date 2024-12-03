import { Controller, Post, Get, Put, Delete, Body, Param, Inject, HttpStatus, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private client: ClientProxy) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const result = await firstValueFrom(
        this.client.send('createOrder', createOrderDto)
      );
      return {
        data: {
          id: result.id,
          eventId: result.eventId,
          userId: result.userId,
          eventName: result.eventName,
          eventDate: result.eventDate,
          orderDetails: result.orderDetails,
        }
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        error: 'Bad Request'
      };
    }
  }

  @Get()
  async findAll() {
    const result = await firstValueFrom(
      this.client.send('findAllOrders', {})
    );
    return {
      statusCode: HttpStatus.OK,
      data: result
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await firstValueFrom(
      this.client.send('findOneOrder', id)
    );
    return {
      statusCode: HttpStatus.OK,
      data: result
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const result = await firstValueFrom(
      this.client.send('updateOrder', { id, ...updateOrderDto })
    );
    return {
      statusCode: HttpStatus.OK,
      data: result
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await firstValueFrom(
      this.client.send('removeOrder', id)
    );
    return {
      statusCode: HttpStatus.OK,
      data: result
    };
  }
}

