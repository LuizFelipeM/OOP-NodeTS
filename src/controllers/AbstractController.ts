import { injectable } from 'inversify'
import { httpGet, httpPost, httpDelete, requestParam, requestBody, interfaces, BaseHttpController, httpPatch } from 'inversify-express-utils'
import { DeepPartial } from 'typeorm'
import { AbstractEntity } from '../domain/entities/AbstractEntity'
import { AbstractRepository } from '../repositories/AbstractRepository'
import { AbstractService } from '../services/AbstractService'

type Service<T extends AbstractEntity> = AbstractService<T, AbstractRepository<T>>

@injectable()
export abstract class AbstractController<T extends AbstractEntity, S extends Service<T>> extends BaseHttpController implements interfaces.Controller {
  constructor (private readonly service: S) { super() }

  @httpGet('/getAll')
  async getAll (): Promise<T[]> {
    return await this.service.getAll()
  }

  @httpGet('/getById/:id')
  async getById (@requestParam('id') id: number): Promise<T | undefined> {
    return await this.service.getById(id)
  }

  @httpPost('/')
  async post (@requestBody() body: DeepPartial<T>): Promise<{ id: number }> {
    return await this.service.saveOrUpdate(body)
  }

  @httpPatch('/')
  async patch (@requestBody() body: DeepPartial<T>): Promise<{ id: number }> {
    return await this.service.saveOrUpdate(body)
  }

  @httpDelete('/')
  delete (@requestBody() body: T): void {
    this.service.remove(body)
  }
}
