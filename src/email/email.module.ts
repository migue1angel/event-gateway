import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [EmailController],
  providers: [],
  imports: [NatsModule],
})
export class EmailModule {}
