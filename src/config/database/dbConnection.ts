import { Connection, createConnection } from 'typeorm'
import { getOptions } from './dbOptions'

async function dbConnection (): Promise<Connection> {
  const options = getOptions()
  const connection = await createConnection(options)

  console.log('\nDatabase connection succeeded'.green)

  return connection
}

export default dbConnection
