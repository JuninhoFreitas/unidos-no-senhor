import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from './config/validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Unidos no Senhor API')
    .setDescription('Documentação da API da Unidos no Senhor')
    .setVersion('1.0')
    .addTag('membro', 'Operações com membros')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
