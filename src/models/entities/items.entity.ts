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
import Cart from './carts.entity'
import FlashSaleItem from './flashSale_item.entity'
import Order from './order.entity'

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

  @HasMany(() => Cart, 'itemId')
  cart: Cart[]

  @HasMany(() => FlashSaleItem, 'itemId')
  flashSaleItem: FlashSaleItem[]

  @HasMany(() => Order, 'itemId')
  order: Order[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
