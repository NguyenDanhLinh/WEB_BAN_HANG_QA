import { UserRoleEnum } from '@enum/users.enum'
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
  HasMany,
} from 'sequelize-typescript'
import UserVoucher from './user_voucher.entity'
import Cart from './carts.entity'
import Order from './order.entity'

@Table({
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  userName!: string

  @Column
  password!: string

  @Column
  name!: string

  @Default(UserRoleEnum.USER)
  @Column(DataType.ENUM({ values: Object.values(UserRoleEnum) }))
  role: UserRoleEnum

  @Column
  phoneNumber!: string

  @Column
  address!: string

  @Column
  email!: string

  @Column
  verify!: boolean

  @HasMany(() => UserVoucher, 'userId')
  userVoucher: UserVoucher[]

  @HasMany(() => Cart, 'userId')
  cart: Cart[]

  @HasMany(() => Order, 'userId')
  order: Order[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
