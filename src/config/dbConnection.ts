import { ConnectionOptions, createConnection } from 'typeorm'
import { join } from 'path'

createConnection({
  type: process.env.DEV_DB_TYPE ?? 'postgres',
  host: process.env.DEV_DB_HOST ?? 'localhost',
  port: process.env.DEV_DB_PORT ?? 5432,
  username: process.env.DEV_DB_USER ?? 'root',
  password: process.env.DEV_DB_PASSWORD ?? 'admin',
  database: process.env.DEV_DATABASE ?? 'test',
  entities: [join(__dirname, '..', 'domain', 'entities', '**', '*.ts')],
  synchronize: true,
  logging: false
} as ConnectionOptions)
  .then(() => console.log('\x1b[36m%s\x1b[0m', 'Database connection succeeded'))
  .catch(err => console.error(err))
