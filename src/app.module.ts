import { EnvironmentConfigurationService } from './core/services/environment-configuration.service';
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from "dotenv";
import { UserEntity } from './public/user/entity/user.entity';
config();
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './public/user/features/authentication/guards/access-token.guard';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    PublicModule,
    PassportModule,
    TypeOrmModule.forRoot({
      type: EnvironmentConfigurationService.instance.dbEngine,
      host: EnvironmentConfigurationService.instance.dbHost,
      port: EnvironmentConfigurationService.instance.dbPort,
      username: EnvironmentConfigurationService.instance.dbUsername,
      password: EnvironmentConfigurationService.instance.dbPassword,
      database: EnvironmentConfigurationService.instance.dbName,
      entities: [UserEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ],
})
export class AppModule { }
