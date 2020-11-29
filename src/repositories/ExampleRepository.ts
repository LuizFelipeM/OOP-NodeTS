import { Example } from '../domain/entities/Example'
import { AbstractRepository } from './AbstractRepository'

export class ExampleRepository extends AbstractRepository<Example> {
  constructor () {
    super(Example)
  }
}
