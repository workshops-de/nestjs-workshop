import { z } from 'zod';

export const EnvVariablesSchema = z.object({
  database_server: z.string().nonempty(),
  database_name: z.string().nonempty(),
  database_port: z.coerce.number().positive(),
  database_username: z.string().nonempty(),
  database_password: z.string().nonempty(),
  database_synchronize_entity_models_with_database: z.boolean().default(false).optional()
});

export type EnvVariables = z.infer<typeof EnvVariablesSchema>;
