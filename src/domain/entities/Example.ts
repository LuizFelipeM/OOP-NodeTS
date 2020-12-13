import { Column, Entity } from 'typeorm'
import { AbstractEntity } from './AbstractEntity'

@Entity()
export class Example extends AbstractEntity {
  @Column({ length: 100 })
  name: string
}
