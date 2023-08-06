import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { VoucherRepositoryInterface } from './interfaces/voucher.repository.interface'
import Voucher from '@models/entities/voucher.entity'
import { Transaction, WhereAttributeHashValue, Op } from 'sequelize'

@Service({ global: true })
class VoucherRepository
  extends BaseRepository<Voucher>
  implements VoucherRepositoryInterface<Voucher>
{
  constructor(@ModelContainer(Voucher.tableName) Voucher: ModelCtor<Voucher>) {
    super(Voucher)
  }

  async decrement(
    field: keyof Voucher,
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

export default VoucherRepository
