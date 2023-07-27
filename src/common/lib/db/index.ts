import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import User from '@models/entities/users.entity'
import Category from '@models/entities/categories.entity'
import Item from '@models/entities/items.entity'
import Voucher from '@models/entities/voucher.entity'
import UserVoucher from '@models/entities/user_voucher.entity'
import Cart from '@models/entities/carts.entity'
import FlashSale from '@models/entities/flash_sale.entity'
import FlashSaleItem from '@models/entities/flashSale_item.entity'
import Order from '@models/entities/order.entity'
import OrderItem from '@models/entities/order_item.entity'
import CartItem from '@models/entities/cart_item.entity'

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
    case Cart.tableName:
      item = DB.sequelize.model(Cart)
      break
    case CartItem.tableName:
      item = DB.sequelize.model(CartItem)
      break
    case FlashSale.tableName:
      item = DB.sequelize.model(FlashSale)
      break
    case FlashSaleItem.tableName:
      item = DB.sequelize.model(FlashSaleItem)
      break
    case Order.tableName:
      item = DB.sequelize.model(Order)
      break
    case OrderItem.tableName:
      item = DB.sequelize.model(OrderItem)
      break
    default:
      item = undefined
      break
  }
  return item
}
