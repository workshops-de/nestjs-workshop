import { EnvironmentVariableProvider } from '../../src/configuration/environment-variable-provider';
import { EnvVariables } from '../../src/configuration/env-variables';

export class EnvVariablesTestingService implements EnvironmentVariableProvider {
  constructor(private readonly environmentVariables: EnvVariables) {}

  get<TEnvKey extends keyof EnvVariables>(key: TEnvKey): EnvVariables[TEnvKey] {
    const envVar = this.environmentVariables[key];

    // `if (!envVar)` is not possible here.
    //  we allwo `false` to be a valid value.
    if (envVar === undefined || envVar === null) {
      throw new Error(`Expected env variable ${key} to be defined.`);
    }

    return envVar;
  }
}
