import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // un prefijo para anteponer en la url de cada servicio
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      transformOptions:{
        enableImplicitConversion: true,
      }
    })
  )

  await app.listen(process.env.PORT);
}
bootstrap();
