import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { VoucherRepositoryInterface } from './interfaces/voucher.repository.interface'
import Voucher from '@models/entities/voucher.entity'
import { Transaction, WhereAttributeHashValue, Op, WhereOptions } from 'sequelize'
import UserVoucher from '@models/entities/user_voucher.entity'
import User from '@models/entities/users.entity'

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

  async getListVoucher(
    whereClause: WhereOptions<Voucher>,
    offset: number,
    limit: number,
    orderBy: any,
  ): Promise<any> {
    return this.model.findAndCountAll({
      where: whereClause,
      order: orderBy,
      offset,
      limit,
    })
  }

  async getListVoucherByUser(
    whereClause: WhereOptions<Voucher>,
    offset: number,
    limit: number,
    orderBy: any,
    userId: number,
  ): Promise<any> {
    return this.model.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UserVoucher,
          as: 'userVoucher',
          required: true,
          where: {
            user_id: userId,
          },
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },
      ],
      order: orderBy,
      offset,
      limit,
    })
  }
}

export default VoucherRepository
