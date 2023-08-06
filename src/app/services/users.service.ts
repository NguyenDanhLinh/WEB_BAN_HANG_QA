import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import UserVoucherRepository from '@repositories/user_voucher.repository'
import VoucherRepository from '@repositories/voucher.repository'
import DB from '@models/index'
import { LoggingException } from '@exceptions/index'

@Service()
class UserServices {
  constructor(
    protected userRepository: UserRepository,
    protected cronServices: CronServices,
    protected userVoucherRepository: UserVoucherRepository,
    protected voucherRepository: VoucherRepository,
  ) {}

  async getAll() {
    return this.userRepository.getAll()
  }

  async createUser(body: CreateUserInterface) {
    body.password = await hash(body.password, 10)

    return this.userRepository.create(body)
  }

  async userLogin(body: UserLoginInterface) {
    const user = await this.userRepository.findByCondition({
      where: { userName: body.userName },
      raw: true,
    })

    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      throw new HttpException(400, 'wrong username or password')
    }

    delete user.password

    return jwt.sign(user, env.auth.jwtSecret)
  }

  async testConLog() {
    await this.cronServices.createScheduleLog(
      '2023-07-25 08:31:00 +00:00	',
      this.userRepository.getAll(),
    )
  }

  async receiveVoucher(voucherId: number, userId: number) {
    const voucher = await this.voucherRepository.findById(voucherId)

    if (voucher.inventoryNumber <= 0) {
      throw new HttpException(400, 'quantity is out')
    }

    const transaction = await DB.sequelize.transaction()

    try {
      await this.voucherRepository.decrement('inventoryNumber', voucherId, 1, transaction)

      await this.userVoucherRepository.create({ voucherId, userId }, transaction)

      transaction.commit()

      return true
    } catch (error) {
      transaction.rollback()

      throw new LoggingException(400, error.message, { voucherId, userId })
    }
  }
}

export default UserServices
