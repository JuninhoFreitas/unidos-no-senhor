import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from './config/validation';
import { readFileSync } from 'fs';
import pem from 'pem';

async function bootstrap() {
  const promise: Promise<pem.CertificateCreationResult> = new Promise((resolve, reject) => {
    pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
      if (err) {
        reject(err);
      }
      resolve(keys);
    });
  });
  const keys = await promise;
  const httpsOptions = {
    key: keys.clientKey,
    cert: keys.certificate,
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

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
  console.log(`EAI: ${process.env}`);
  await app.listen(3003);
}
bootstrap();
