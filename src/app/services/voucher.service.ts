import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import CategoryRepository from '@repositories/category.repository'
import VoucherRepository from '@repositories/voucher.repository'

@Service()
class VoucherServices {
  constructor(
    protected voucherRepository: VoucherRepository,
    protected cronServices: CronServices,
  ) {}
}

export default VoucherServices
