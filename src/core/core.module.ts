import { Module } from '@nestjs/common';
import { EnvironmentConfigurationService } from './services/environment-configuration.service';

@Module({
  providers: [EnvironmentConfigurationService]
})
export class CoreModule { }
