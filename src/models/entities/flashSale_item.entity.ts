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
import FlashSale from './flash_sale.entity'

@Table({
  tableName: 'flashSale_item',
})
export default class FlashSaleItem extends Model<FlashSaleItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column({ field: 'flashSale_id' })
  @ForeignKey(() => FlashSale)
  flashSaleId!: number

  @BelongsTo(() => FlashSale, 'flashSaleId')
  flashSale: FlashSale

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
