import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // un prefijo para anteponer en la url de cada servicio
  app.setGlobalPrefix('api/v2')

  await app.listen(3000);
}
bootstrap();
