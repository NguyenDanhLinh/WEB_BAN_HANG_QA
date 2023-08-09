import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import FlashSaleItem from '@models/entities/flashSale_item.entity'
import { FlashSaleItemRepositoryInterface } from './interfaces/flashSale_item.repository.interface'
import { Transaction, WhereAttributeHashValue } from 'sequelize'

@Service({ global: true })
class FlashSaleItemRepository
  extends BaseRepository<FlashSaleItem>
  implements FlashSaleItemRepositoryInterface<FlashSaleItem>
{
  constructor(@ModelContainer(FlashSaleItem.tableName) FlashSaleItem: ModelCtor<FlashSaleItem>) {
    super(FlashSaleItem)
  }

  async create(param, transaction?: Transaction): Promise<FlashSaleItem> {
    return this.model.create(param, { transaction: transaction })
  }

  async decrement(
    field: keyof FlashSaleItem,
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

export default FlashSaleItemRepository
