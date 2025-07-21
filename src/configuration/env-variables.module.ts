import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from './validate-env-variables';
import { EnvVariablesService } from './env-variables.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnvVariables })],
  providers: [EnvVariablesService],
  exports: [EnvVariablesService]
})
export class EnvVariablesModule {}
