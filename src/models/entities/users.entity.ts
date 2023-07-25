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
} from 'sequelize-typescript'

@Table({
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
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

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
