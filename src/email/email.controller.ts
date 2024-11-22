import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TokenInjectionEnum } from 'src/shared/enums/token-injection.enum';

@Controller('email')
export class EmailController {
  constructor(
    @Inject(TokenInjectionEnum.EMAIL_SERVICE)
    private readonly emailClient: ClientProxy,
  ) {}

  @Post()
  async sendEmail(@Body() payload: any) {
    return this.emailClient.send('sendEmail', payload).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      }),
    );
  }
}
