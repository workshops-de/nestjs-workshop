import { DynamicModule, Global, Module } from '@nestjs/common';
import { EnvVariables } from '../../src/configuration/env-variables';
import { EnvVariablesModule } from '../../src/configuration/env-variables.module';
import { EnvVariablesService } from '../../src/configuration/env-variables.service';
import { EnvVariablesTestingService } from './env-variables-testing.service';

@Global()
@Module({})
export class EnvVariablesTestingModule {
  static with(env: EnvVariables): DynamicModule {
    return {
      module: EnvVariablesModule,
      providers: [
        {
          provide: EnvVariablesService,
          useFactory: () => new EnvVariablesTestingService(env)
        }
      ],
      exports: []
    };
  }
}
