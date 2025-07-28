import { EnvVariables } from './env-variables';

export type EnvironmentVariableProvider = {
  get<TEnvKey extends keyof EnvVariables>(key: TEnvKey): EnvVariables[TEnvKey];
};