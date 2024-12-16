import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  BadRequestException,
  Req,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { create } from 'domain';
import { any, string } from 'joi';
import { CloudinaryImageConfig } from 'src/config/cloudinary-image-config';
import { FilesValidationPipe } from './pipes/file.pipe';
import { firstValueFrom } from 'rxjs';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { ParseJsonPipe } from './pipes/json.pipe';

@Controller('events')
export class EventController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 3))
  async create(
    @UploadedFiles(FilesValidationPipe)
    images: Express.Multer.File[],

    @Body('event', ParseJsonPipe) createEventDto: any,
  ) {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        return await this.cloudinaryService.uploadImage(image);
      }),
    );

    try {
      return this.client.send('createEvent', {
        ...createEventDto,
        images: uploadedImages,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll() {
    return this.client.send('findAllEvents', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneEvent', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.client.send('update_event', id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('remove_event', id);
  }

  @Get('validate/ticket')
  async validateTicketType(@Body() validateTicketTypeDto: any) {
    try {
      return await firstValueFrom(
        this.client.send('validateTicketTypes', validateTicketTypeDto),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
