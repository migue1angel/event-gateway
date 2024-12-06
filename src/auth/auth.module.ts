import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { NatsModule } from 'src/transports/nats.module';
import { GoogleStrategy } from 'src/shared/strategies';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [AuthController, UsersController],
  providers: [GoogleStrategy],
  imports: [NatsModule],
})
export class AuthModule {}
 