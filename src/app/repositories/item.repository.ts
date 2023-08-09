import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { ItemRepositoryInterface } from './interfaces/item.repository.interface'
import Item from '@models/entities/items.entity'
import { Op, Transaction, WhereAttributeHashValue, WhereOptions } from 'sequelize'
import FlashSaleItem from '@models/entities/flashSale_item.entity'
import FlashSale from '@models/entities/flash_sale.entity'
import Category from '@models/entities/categories.entity'
import CartItem from '@models/entities/cart_item.entity'

@Service({ global: true })
class ItemRepository extends BaseRepository<Item> implements ItemRepositoryInterface<Item> {
  constructor(@ModelContainer(Item.tableName) Item: ModelCtor<Item>) {
    super(Item)
  }

  async getListItems(
    whereClause: WhereOptions<Item>,
    offset: number,
    limit: number,
    orderBy: any,
    quantity?: number,
  ): Promise<any> {
    return this.model.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: FlashSaleItem,
          as: 'flashSaleItem',
          required: false,
          where: {
            quantity: {
              [Op.gte]: quantity ? quantity : 1,
            },
          },
          include: [
            {
              model: FlashSale,
              as: 'flashSale',
              required: false,
            },
          ],
        },
      ],
      order: orderBy,
      offset,
      limit,
    })
  }

  async getItems(whereClause: WhereOptions<Item>, quantity?: number): Promise<any> {
    return this.model.findOne({
      where: whereClause,
      include: [
        {
          model: FlashSaleItem,
          as: 'flashSaleItem',
          required: false,
          where: {
            quantity: {
              [Op.gte]: quantity ? quantity : 1,
            },
          },
          include: [
            {
              model: FlashSale,
              as: 'flashSale',
              required: false,
            },
          ],
        },
      ],
    })
  }

  async decrement(
    field: keyof Item,
    id: WhereAttributeHashValue<number>,
    amount: number,
    transaction?: Transaction,
  ) {
    return this.model.decrement(
      {
        [field]: amount,
      },
      {
        where: {
          id,
        },
        transaction,
      },
    )
  }
}

export default ItemRepository
