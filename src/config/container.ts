import { Container } from 'inversify'

export const container = new Container()

/**
 * Container REPOSITORIES configuration binding
 */
container.bind<UserRepository>(UserRepository).toSelf()

/**
 * Container SERVICES configuration binding
 */
container.bind<StudentService>(StudentService).toSelf()
