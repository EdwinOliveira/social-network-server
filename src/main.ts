import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfigurationService } from './core/services/environment-configuration.service';
import { AccessTokenGuard } from './public/user/features/authentication/guards/access-token.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(EnvironmentConfigurationService.instance.serverPort);
}
bootstrap();
