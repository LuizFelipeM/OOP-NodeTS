import { Column } from 'typeorm'
import { AbstractEntity } from './AbstractEntity'

export class BaseEntity extends AbstractEntity {
  @Column()
  updatedAt: Date

  @Column()
  createdAt: Date
}
