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
import Cart from './carts.entity'

@Table({
  tableName: 'cart_item',
})
export default class CartItem extends Model<CartItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  @ForeignKey(() => Cart)
  cartId!: number

  @BelongsTo(() => Cart, 'cartId')
  cart: Cart

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
