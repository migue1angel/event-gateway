import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TokenInjectionEnum } from 'src/shared/enums/token-injection.enum';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(
    @Inject(TokenInjectionEnum.EMAIL_SERVICE)
    private readonly emailClient: ClientProxy,
  ) {}

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailClient.send('sendEmail', sendEmailDto).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      }),
    );
  }
}
