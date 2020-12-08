import { injectable } from 'inversify'
import { Example } from '../domain/entities/Example'
import { AbstractRepository } from './AbstractRepository'

@injectable()
export class ExampleRepository extends AbstractRepository<Example> {
  constructor () {
    super(Example)
  }
}
