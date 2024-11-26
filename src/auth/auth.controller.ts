import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateInformationUserDto } from './dto/information-user/create-information-user.dto';
import { UpdateInformationUserDto } from './dto/information-user/update-information-user.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createInformationUserDto: CreateInformationUserDto) {
    return this.client.send(`creado`,createInformationUserDto)
  }

  @Get()
  findAll() {
    return this.client.send(`encontrado`, {})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send(`encontrado`, id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformationUserDto: UpdateInformationUserDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Eliminado`;
  }
}

