import 'reflect-metadata'
import 'colors'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

export function app (container: Container): void {
  const server = new InversifyExpressServer(
    container,
    null,
    {
      rootPath: process.env.ROOT_PATH ?? '/'
    })// new InversifyExpressServer(DIContainer, null, null, null, AuthProvider)

  server.setConfig(app => {
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN ?? '*',
        optionsSuccessStatus: 200
      })
    )
    app.use(urlencoded({ extended: true }))
    app.use(json())
  })

  const app = server.build()

  app.listen(
    process.env.PORT,
    () => console.log(
      'Server is now running on:'.green,
      `${process.env.HOST}:${process.env.PORT}${process.env.ROOT_PATH ?? ''}\n`.cyan
    )
  )
}
