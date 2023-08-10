import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { FlashSaleRepositoryInterface } from './interfaces/flash_sale.repository.interface'
import FlashSale from '@models/entities/flash_sale.entity'
import { Transaction, WhereOptions } from 'sequelize'
import FlashSaleItem from '@models/entities/flashSale_item.entity'
import Item from '@models/entities/items.entity'
import Category from '@models/entities/categories.entity'

@Service({ global: true })
class FlashSaleRepository
  extends BaseRepository<FlashSale>
  implements FlashSaleRepositoryInterface<FlashSale>
{
  constructor(@ModelContainer(FlashSale.tableName) FlashSale: ModelCtor<FlashSale>) {
    super(FlashSale)
  }

  async create(param, transaction?: Transaction): Promise<FlashSale> {
    return this.model.create(param, { transaction: transaction })
  }

  async getFlashSale(
    whereClause: WhereOptions<FlashSale>,
    offset: number,
    limit: number,
    orderBy: any,
  ): Promise<any> {
    return this.model.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: FlashSaleItem,
          as: 'flashSaleItem',
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
          ],
        },
      ],
      order: orderBy,
      offset,
      limit,
      distinct: true,
    })
  }
}

export default FlashSaleRepository
