import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import FlashSaleItem from '@models/entities/flashSale_item.entity'
import { FlashSaleItemRepositoryInterface } from './interfaces/flashSale_item.repository.interface'

@Service({ global: true })
class FlashSaleItemRepository
  extends BaseRepository<FlashSaleItem>
  implements FlashSaleItemRepositoryInterface<FlashSaleItem>
{
  constructor(@ModelContainer(FlashSaleItem.tableName) FlashSaleItem: ModelCtor<FlashSaleItem>) {
    super(FlashSaleItem)
  }
}

export default FlashSaleItemRepository
