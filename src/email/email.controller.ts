import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { SendEmailDto } from './dto/send-email.dto';
import { NATS_SERVICE } from 'src/config/services';

@Controller('email')
export class EmailController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}
 
  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.client.emit('sendEmail', sendEmailDto).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      }),
    );
  }
}
