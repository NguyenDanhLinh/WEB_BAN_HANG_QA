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

@Table({
  tableName: 'user_voucher',
})
export default class UserVoucher extends Model<UserVoucher> {
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
