import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Order from '@models/entities/order.entity'
import { OrderRepositoryInterface } from './interfaces/order.repository.interface'
import { Sequelize, Transaction, WhereOptions } from 'sequelize'
import User from '@models/entities/users.entity'
import Voucher from '@models/entities/voucher.entity'
import OrderItem from '@models/entities/order_item.entity'
import Item from '@models/entities/items.entity'
import Category from '@models/entities/categories.entity'
import FlashSale from '@models/entities/flash_sale.entity'
import FlashSaleItem from '@models/entities/flashSale_item.entity'

@Service({ global: true })
class OrderRepository extends BaseRepository<Order> implements OrderRepositoryInterface<Order> {
  constructor(@ModelContainer(Order.tableName) Order: ModelCtor<Order>) {
    super(Order)
  }

  async create(param, transaction?: Transaction): Promise<Order> {
    return this.model.create(param, { transaction: transaction })
  }

  async getOrder(
    whereClause: WhereOptions<Order>,
    offset: number,
    limit: number,
    orderBy: any,
  ): Promise<any> {
    return this.model.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: OrderItem,
          as: 'orderItem',
          required: true,
          include: [
            {
              model: Item,
              as: 'item',
              required: false,
              include: [
                {
                  model: Category,
                  as: 'category',
                  required: false,
                },
              ],
            },
            {
              model: FlashSale,
              as: 'flashSale',
              required: false,
              include: [
                {
                  model: FlashSaleItem,
                  as: 'flashSaleItem',
                  required: false,
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          required: true,
        },
        {
          model: Voucher,
          as: 'voucher',
          required: false,
        },
      ],
      order: orderBy,
      offset,
      limit,
      distinct: true,
    })
  }
}

export default OrderRepository
