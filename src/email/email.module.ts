import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TokenInjectionEnum } from 'src/shared/enums/token-injection.enum';

@Module({
  controllers: [EmailController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: TokenInjectionEnum.EMAIL_SERVICE,
        transport: Transport.TCP,
        options: { port: 3001, host: 'localhost' },
      },
    ]),
  ],
})
export class EmailModule {}
