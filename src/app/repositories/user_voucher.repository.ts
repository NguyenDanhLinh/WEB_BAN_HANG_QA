import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import UserVoucher from '@models/entities/user_voucher.entity'
import { UserVoucherRepositoryInterface } from './interfaces/user_voucher.repository.interface'

@Service({ global: true })
class UserVoucherRepository
  extends BaseRepository<UserVoucher>
  implements UserVoucherRepositoryInterface<UserVoucher>
{
  constructor(@ModelContainer(UserVoucher.tableName) UserVoucher: ModelCtor<UserVoucher>) {
    super(UserVoucher)
  }
}

export default UserVoucherRepository
