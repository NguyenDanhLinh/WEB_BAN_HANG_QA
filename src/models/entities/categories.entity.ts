import { StatusCategoryEnum } from '@enum/categories.enum'
import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  DataType,
  Default,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript'
import Item from './items.entity'

@Table({
  tableName: 'categories',
})
export default class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  name!: string

  @Column
  img!: string

  @Default(StatusCategoryEnum.ACTIVE)
  @Column(DataType.ENUM({ values: Object.values(StatusCategoryEnum) }))
  status: StatusCategoryEnum

  @HasMany(() => Item, 'categoryId')
  item: Item[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
