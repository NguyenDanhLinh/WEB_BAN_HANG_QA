import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { FlashSaleRepositoryInterface } from './interfaces/flash_sale.repository.interface'
import FlashSale from '@models/entities/flash_sale.entity'
import { Transaction } from 'sequelize'

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
}

export default FlashSaleRepository
