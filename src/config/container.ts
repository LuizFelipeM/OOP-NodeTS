import { glob } from 'glob'
import { Container, interfaces } from 'inversify'
import { join } from 'path'

export function buildContainer (): Promise<Container> {
  const repositoriesPath = join(__dirname, '..', 'repositories')
  const servicesPath = join(__dirname, '..', 'services')
  const controllersPath = join(__dirname, '..', 'controllers')

  const promiseContainer = new Promise<Container>((resolve, reject) => {
    try {
      /**
       * Container CONTROLLERS, REPOSITORIES and SERVICES binding configuration
       */
      const controllersReposAndServices = glob.sync(`{${repositoriesPath},${servicesPath},${controllersPath}}/**/*{Repository,Service,Controller}.{ts,js}`)
      const importControllersReposAndServices = controllersReposAndServices.map(file => import(file))

      Promise
        .all(importControllersReposAndServices)
        .then((values: Array<{ [x: string]: interfaces.ServiceIdentifier<unknown> }>) => {
          const container = new Container()

          values.forEach(val => {
            for (const key in val) {
              if (Object.prototype.hasOwnProperty.call(val, key)) {
                container.bind(val[key]).toSelf()
              }
            }
          })

          resolve(container)
        })
        .catch(reject)
    } catch (err) {
      reject(err)
    }
  })

  return promiseContainer
}
