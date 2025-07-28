import { EnvironmentVariableProvider } from '../../src/configuration/environment-variable-provider';
import { EnvVariables } from '../../src/configuration/env-variables';

export class EnvVariablesTestingService implements EnvironmentVariableProvider {
  constructor(private readonly environmentVariables: EnvVariables) {}

  get<TEnvKey extends keyof EnvVariables>(key: TEnvKey): EnvVariables[TEnvKey] {
    const envVar = this.environmentVariables[key];

    if (!envVar) throw new Error(`Environment variable ${key} not found`);

    return envVar;
  }
}
