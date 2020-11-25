import { injectable } from 'inversify'
import { httpGet, httpPost, httpDelete, requestParam, requestBody, interfaces, BaseHttpController, httpPatch } from 'inversify-express-utils'
import { IBaseEntity } from '../domain/interfaces/entities/IBaseEntity'
import { AbstractRepository } from '../repositories/AbstractRepository'
import { AbstractService } from '../services/AbstractService'

type Service<T extends IBaseEntity> = AbstractService<T, AbstractRepository<T>>

@injectable()
export abstract class AbstractController<T extends IBaseEntity, S extends Service<T>> extends BaseHttpController implements interfaces.Controller {
  constructor (private readonly service: S) { super() }

  @httpGet('/getAll')
  async getAll (): Promise<T[]> {
    return await this.service.getAll()
  }

  @httpGet('/getById/:id')
  async getById (@requestParam('id') id: number): Promise<T> {
    return await this.service.getById(id)
  }

  @httpPost('/')
  async post (@requestBody() body: Omit<T, 'id'>): Promise<{ id: number }> {
    return await this.service.create(body)
  }

  @httpPatch('/')
  patch (@requestBody() body: Partial<T>): void {
    this.service.updateById(body)
  }

  @httpDelete('/')
  delete (@requestBody() body: T): void {
    this.service.remove(body)
  }
}
