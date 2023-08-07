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
import Order from './order.entity'
import UserVoucher from './user_voucher.entity'

@Table({
  tableName: 'voucher',
})
export default class Voucher extends Model<Voucher> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  name!: string

  @Column
  barcode!: string

  @Default(0)
  @Column
  percent!: number

  @Default('0')
  @Column
  moneyReduced!: string

  @Column
  startDate!: Date

  @Column
  endDate!: Date

  @Column
  inventoryNumber!: number

  @HasMany(() => Order, 'itemId')
  order: Order[]

  @HasMany(() => UserVoucher, 'voucherId')
  userVoucher: UserVoucher[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
