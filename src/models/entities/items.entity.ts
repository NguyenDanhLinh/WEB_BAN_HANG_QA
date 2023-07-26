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
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import Category from './categories.entity'

@Table({
  tableName: 'items',
})
export default class Item extends Model<Item> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  name!: string

  @Column
  barcode!: string

  @Column
  inputPrice!: string

  @Column
  outputPrice!: string

  @Column
  weight!: string

  @Column
  avatar!: string

  @Column
  imgDetail!: string

  @Column
  description: string

  @Column
  inventoryNumber: number

  @Column
  @ForeignKey(() => Category)
  categoryId!: number

  @BelongsTo(() => Category, 'categoryId')
  category: Category

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
