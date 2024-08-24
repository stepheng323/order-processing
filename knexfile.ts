import type { Knex } from 'knex';
import { Env } from './src/lib/env.config';

module.exports = {
  client: 'pg',
  connection: Env.DATABASE_URL,
  pool: {
    min: 5,
    max: 1000,
    acquireTimeoutMillis: 60 * 1000 * 4,
  },
  debug: false,
  migrations: {
    directory: 'src/lib/database/migrations',
  },
  seeds: {
    directory: 'src/lib/database/seed',
  },
} as Knex.Config;
