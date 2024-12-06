import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client:ClientProxy,
  ) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   const user = await this.usersService.create(createUserDto);
  //   return user;
  // }

  // @Get()
  // async findAll() {
  //   const users = await this.usersService.findAll();
  //   return users;
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  async findProfile(@Request() req) { 
    const response = req.user;
    const {token, ...user} = response;
    return user;  
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
  //   return await this.usersService.update(id, payload);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return await this.usersService.delete(id);
  // }
}
