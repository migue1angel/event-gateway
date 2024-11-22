import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TokenInjectionEnum } from 'src/shared/enums/token-injection.enum';
import { envs } from 'src/config/envs';

@Module({
  controllers: [EmailController], 
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: TokenInjectionEnum.EMAIL_SERVICE,
        transport: Transport.TCP,
        options: { port: envs.EMAIL_MS_PORT, host: envs.EMAIL_MS_HOST },
      },
    ]),
  ],
})
export class EmailModule {}
