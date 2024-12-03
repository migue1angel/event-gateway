import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './shared/exceptions/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main Event-Gateway');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(process.env.PORT);
  logger.log(`Event-Gateway running on port ${process.env.PORT}`);
}
bootstrap();
