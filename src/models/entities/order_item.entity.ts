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
import Order from './order.entity'
import FlashSale from './flash_sale.entity'

@Table({
  tableName: 'order_item',
})
export default class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  @ForeignKey(() => Order)
  orderId!: number

  @BelongsTo(() => Order, 'orderId')
  order: Order

  @Column
  @ForeignKey(() => Item)
  itemId!: number

  @BelongsTo(() => Item, 'itemId')
  item: Item

  @Column
  quantity!: number

  @Column
  @ForeignKey(() => FlashSale)
  flashSaleId!: number

  @BelongsTo(() => FlashSale, 'flashSaleId')
  flashSale: FlashSale

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
