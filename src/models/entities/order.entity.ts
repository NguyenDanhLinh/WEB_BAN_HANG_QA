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
import { StatusOderEnum } from '@enum/order.enum'

@Table({
  tableName: 'orders',
})
export default class Order extends Model<Order> {
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

  @Default(StatusOderEnum.PENDING)
  @Column(DataType.ENUM({ values: Object.values(StatusOderEnum) }))
  status: StatusOderEnum

  @Column
  totalPrice!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
