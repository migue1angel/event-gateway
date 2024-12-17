import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { EventController } from './controllers/event.controller';
import { CatalogueController } from './controllers/catalogue.controller';

@Module({
  controllers: [EventController, CatalogueController],
  imports: [NatsModule],
  providers: [CloudinaryService], 
})
export class EventModule {}
