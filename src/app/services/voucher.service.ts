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
import { CreateVoucherInterface } from '@interfaces/voucher.interface'

@Service()
class VoucherServices {
  constructor(
    protected voucherRepository: VoucherRepository,
    protected cronServices: CronServices,
  ) {}

  async createVoucher(body: CreateVoucherInterface) {
    body.barcode = this.generateRandomBarcode()

    const voucher = await this.voucherRepository.create(body)

    this.cronServices.createScheduleCloseVoucher(body.endDate, voucher.id)

    return voucher
  }

  generateRandomBarcode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength)
      result += characters.charAt(randomIndex)
    }

    return result
  }
}

export default VoucherServices
