import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NATS_SERVICE } from "src/config/services";
import { CloudinaryService } from "src/shared/services/cloudinary.service";

@Controller('catalogues')
export class CatalogueController{
    constructor(
        @Inject(NATS_SERVICE)
            private readonly client: ClientProxy,
            private readonly cloudinaryService: CloudinaryService,
            
    ){}

    @Get()
      findAll() {
        return this.client.send('findAllCatalogues', {});
      }
}