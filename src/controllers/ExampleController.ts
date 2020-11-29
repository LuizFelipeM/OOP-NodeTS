import { inject } from 'inversify'
import { controller } from 'inversify-express-utils'
import { Example } from '../domain/entities/Example'
import { ExampleService } from '../services/ExampleService'
import { AbstractController } from './AbstractController'

@controller('/example')
export class ExampleController extends AbstractController<Example, ExampleService> {
  constructor (
    @inject(ExampleService)
    protected readonly exampleService: ExampleService
  ) { super(exampleService) }
}
