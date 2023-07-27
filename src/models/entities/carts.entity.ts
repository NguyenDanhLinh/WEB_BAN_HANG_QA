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
import User from './users.entity'
import Voucher from './voucher.entity'
import Item from './items.entity'

@Table({
  tableName: 'carts',
})
export default class Cart extends Model<Cart> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  @ForeignKey(() => User)
  userId!: number

  @BelongsTo(() => User, 'userId')
  user: User

  @Column
  @ForeignKey(() => Item)
  itemId!: number

  @BelongsTo(() => Item, 'itemId')
  item: Item

  @Column
  quantity!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
