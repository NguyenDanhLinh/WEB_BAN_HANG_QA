import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import User from '@models/entities/users.entity'
import Category from '@models/entities/categories.entity'
import Item from '@models/entities/items.entity'
import Voucher from '@models/entities/voucher.entity'
import UserVoucher from '@models/entities/user_voucher.entity'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case User.tableName:
      item = DB.sequelize.model(User)
      break
    case Category.tableName:
      item = DB.sequelize.model(Category)
      break
    case Item.tableName:
      item = DB.sequelize.model(Item)
      break
    case Voucher.tableName:
      item = DB.sequelize.model(Voucher)
      break
    case UserVoucher.tableName:
      item = DB.sequelize.model(UserVoucher)
      break
    default:
      item = undefined
      break
  }
  return item
}
