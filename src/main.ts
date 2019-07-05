import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //یکی از راه ها این است که به صورت عمومی استفاده شود یا روی هر متد
 // app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
