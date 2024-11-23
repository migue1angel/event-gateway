import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {
    console.log('PaymentController initialized in Gateway');
  }

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    console.log('Gateway received POST request:', createRegisterDto);
    return this.paymentService.create(createRegisterDto);
  }

  @Get()
  findAll() {
    console.log('Gateway received GET all request');
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('Gateway received GET one request for id:', id);
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterDto: UpdateRegisterDto) {
    console.log('Gateway received PATCH request for id:', id, 'with data:', updateRegisterDto);
    return this.paymentService.update(+id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('Gateway received DELETE request for id:', id);
    return this.paymentService.remove(+id);
  }
}