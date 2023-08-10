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
  HasMany,
} from 'sequelize-typescript'
import Category from './categories.entity'
import User from './users.entity'
import Voucher from './voucher.entity'
import Item from './items.entity'
import { StatusOderEnum } from '@enum/order.enum'
import OrderItem from './order_item.entity'

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

  @Default(StatusOderEnum.PENDING)
  @Column(DataType.ENUM({ values: Object.values(StatusOderEnum) }))
  status: StatusOderEnum

  @Column
  totalPrice!: string

  @HasMany(() => OrderItem, 'orderId')
  orderItem: OrderItem[]

  @Column
  @ForeignKey(() => Voucher)
  voucherId!: number

  @BelongsTo(() => Voucher, 'voucherId')
  voucher: Voucher

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
