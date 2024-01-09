import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,ppa,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  app.use(graphqlUploadExpress({ maxFileSize: 10000000 }));
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
