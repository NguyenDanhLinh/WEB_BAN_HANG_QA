import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import UserVoucher from '@models/entities/user_voucher.entity'
import { UserVoucherRepositoryInterface } from './interfaces/user_voucher.repository.interface'
import { Transaction, WhereOptions } from 'sequelize'
import Voucher from '@models/entities/voucher.entity'

@Service({ global: true })
class UserVoucherRepository
  extends BaseRepository<UserVoucher>
  implements UserVoucherRepositoryInterface<UserVoucher>
{
  constructor(@ModelContainer(UserVoucher.tableName) UserVoucher: ModelCtor<UserVoucher>) {
    super(UserVoucher)
  }

  async create(param, transaction?: Transaction): Promise<UserVoucher> {
    return this.model.create(param, { transaction: transaction })
  }

  async getUserVoucher(whereClause: WhereOptions<UserVoucher>) {
    return this.model.findOne({
      where: whereClause,
      include: [
        {
          model: Voucher,
          as: 'voucher',
        },
      ],
    })
  }
}

export default UserVoucherRepository
