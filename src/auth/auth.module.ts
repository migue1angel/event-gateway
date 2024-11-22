import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { TokenInjectionEnum } from 'src/shared/enums/token-injection.enum';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ClientsModule.register([
      {
        name: TokenInjectionEnum.EVENT_SERVICE,
        transport: Transport.TCP,
        options: { port: envs.AUTH_MS_PORT, host: envs.AUTH_MS_HOST },
      },
    ]),
  ],
})
export class AuthModule {}
