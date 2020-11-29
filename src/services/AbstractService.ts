import { AbstractRepository } from '../repositories/AbstractRepository'
import { injectable } from 'inversify'
import { AbstractEntity } from '../domain/entities/AbstractEntity'
import { DeepPartial, DeleteResult, FindConditions } from 'typeorm'

type Repository<T extends AbstractEntity> = AbstractRepository<T>

@injectable()
export abstract class AbstractService<T extends AbstractEntity, R extends Repository<T>> {
  constructor (private readonly repository: R) {}

  getAll = async (search?: FindConditions<T>): Promise<T[]> => await this.repository.select(search)

  getById = async (id: number): Promise<T | undefined> => await this.repository.selectById(id)

  saveOrUpdate = (data: DeepPartial<T>): Promise<{ id: number }> => this.repository.insertOrUpdate(data)

  remove = (data: T): Promise<DeleteResult> => this.repository.delete(data.id)
}
