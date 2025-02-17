import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';


async function bootstrap() {
  const logger = new Logger('Gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  app.useGlobalFilters(
    new RpcCustomExceptionFilter()
  )

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  })

  await app.listen(envs.port);
  logger.log(`Gateway runnin on port ${envs.port}`)
}
bootstrap();
