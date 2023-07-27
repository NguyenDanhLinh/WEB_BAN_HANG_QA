import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { VoucherRepositoryInterface } from './interfaces/voucher.repository.interface'
import Voucher from '@models/entities/voucher.entity'

@Service({ global: true })
class VoucherRepository
  extends BaseRepository<Voucher>
  implements VoucherRepositoryInterface<Voucher>
{
  constructor(@ModelContainer(Voucher.tableName) Voucher: ModelCtor<Voucher>) {
    super(Voucher)
  }
}

export default VoucherRepository
