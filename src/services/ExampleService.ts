import { inject } from 'inversify'
import { Example } from '../domain/entities/Example'
import { ExampleRepository } from '../repositories/ExampleRepository'
import { AbstractService } from './AbstractService'

export class ExampleService extends AbstractService<Example, ExampleRepository> {
  constructor (
    @inject(ExampleRepository)
    protected readonly exampleRepository: ExampleRepository
  ) { super(exampleRepository) }
}
