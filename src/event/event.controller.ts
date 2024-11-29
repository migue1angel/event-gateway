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
} from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { create } from 'domain';
import { any, string } from 'joi';
import { CloudinaryImageConfig } from 'src/config/cloudinary-image-config';
import { FilesValidationPipe } from './pipes/file.pipe';

@Controller('event')
export class EventController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  // @UseInterceptors(
  //   FilesInterceptor('images', 3, {
  //     limits: {
  //       fileSize: CloudinaryImageConfig.maxFileSize,
  //     },
  //     fileFilter: (req, file, callback) => {
  //       if (!CloudinaryImageConfig.allowedMimeTypes.includes(file.mimetype)) {
  //         return callback(
  //           new BadRequestException('File type not allowed'),
  //           false,
  //         );
  //       }
  //       callback(null, true);
  //     },
  //   }),
  // )
  create(
    // @UploadedFiles(FilesValidationPipe)
    // files: Express.Multer.File[],
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.client.send('createEvent', { ...createEventDto });
  }

  @Get()
  findAll() {
    return this.client.send('find_all_events', {});
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
}
