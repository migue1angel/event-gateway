import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [EmailModule, AuthModule, EventModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}