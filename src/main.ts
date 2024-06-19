import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  const swaggerConfig = new DocumentBuilder()
      .setTitle("Help App")
      .setDescription("BEST APP")
      .setVersion("1.0")
      .addTag('API')
      .build();
  const documentSwagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, documentSwagger);

  await app.listen(port);
}
bootstrap();
