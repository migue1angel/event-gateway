import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';

@Controller('event')
export class EventController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client:ClientProxy
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.client.send('create_event', createEventDto);
  }
  
  @Get()
  findAll() {
    return this.client.send('find_all_events', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('find_one_event', id);

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.client.send('update_event', id)

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('remove_event', id)
  }
}
