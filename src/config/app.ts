import 'reflect-metadata'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './container'

export function app (): void {
  const server = new InversifyExpressServer(container)// new InversifyExpressServer(DIContainer, null, null, null, AuthProvider)

  server.setConfig(app => {
    app.use(cors({
      origin: process.env.CORS_ORIGIN,
      optionsSuccessStatus: 200
    }))
    app.use(urlencoded({ extended: true }))
    app.use(json())
  })

  const app = server.build()

  app.listen(process.env.PORT, () => console.log('\x1b[36m%s\x1b[0m', '\n\nServer is now running on port:', `${process.env.HOST}:${process.env.PORT}/\n\n`))
}
