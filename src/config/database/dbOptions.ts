import { join } from 'path'
import { ConnectionOptions } from 'typeorm'
import { isDevEnv } from '../../utils/environments'

export const getOptions = (): ConnectionOptions => {
  const devOpts: ConnectionOptions = {
    synchronize: true,
    type: process.env.DEV_DB_TYPE as any ?? 'postgres',
    host: process.env.DEV_DB_HOST ?? 'localhost',
    port: Number(process.env.DEV_DB_PORT) ?? 5432,
    username: process.env.DEV_DB_USER ?? 'postgres',
    password: process.env.DEV_DB_PASSWORD ?? 'admin',
    database: process.env.DEV_DATABASE ?? 'test',
    entities: [join(__dirname, '..', '..', 'domain', 'entities', '**', '*.{ts,js}')],
    logging: ['migration', 'error', 'warn', 'query', 'info']
  }

  const prodOpts: ConnectionOptions = {
    synchronize: false,
    type: process.env.PROD_DB_TYPE as any ?? 'postgres',
    host: process.env.PROD_DB_HOST ?? 'localhost',
    port: Number(process.env.PROD_DB_PORT) ?? 5432,
    username: process.env.PROD_DB_USER ?? 'postgres',
    password: process.env.PROD_DB_PASSWORD ?? 'admin',
    database: process.env.PROD_DATABASE ?? 'test',
    entities: [join(__dirname, '..', '..', 'domain', 'entities', '**', '*.{ts,js}')],
    logging: ['migration', 'error', 'warn']
  }

  return isDevEnv() ? devOpts : prodOpts
}
