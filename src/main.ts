import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const logger = new Logger('Gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [{
      path: '',
      method: RequestMethod.GET
    }]
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  app.useGlobalFilters(
    new RpcCustomExceptionFilter()
  )

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://192.168.192.1:3000',
    credentials: true
  })

  console.log('Health Check configured');

  await app.listen(envs.port);
  logger.log(`Gateway runnin on port ${envs.port}`)
}
bootstrap();
