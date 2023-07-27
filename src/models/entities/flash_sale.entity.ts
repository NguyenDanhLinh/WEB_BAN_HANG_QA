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

@Table({
  tableName: 'flash_sale',
})
export default class FlashSale extends Model<FlashSale> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

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

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
