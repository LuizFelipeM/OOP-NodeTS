import { app } from './app'
import { buildContainer } from './container'
import dbConnection from './database/dbConnection'

Promise
  .all([
    buildContainer(),
    dbConnection()
  ])
  .then(([container]) => app(container))
  .catch((err) => console.error('Startup'.red, err))
