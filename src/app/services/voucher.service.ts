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
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import { Pagination } from '@interfaces/pagination.interface'
import { Op, WhereOptions } from 'sequelize'
import Voucher from '@models/entities/voucher.entity'

@Service()
class VoucherServices {
  constructor(
    protected voucherRepository: VoucherRepository,
    protected cronServices: CronServices,
  ) {}

  async createVoucher(body: CreateVoucherInterface) {
    if (body.percent > 100) {
      throw new HttpException(400, 'The amount of reduction is too big')
    }

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

  async updateVoucher(body: UpdateVoucherInterface) {
    const voucherId = body.voucherId

    delete body.voucherId

    const voucher = await this.voucherRepository.findById(voucherId)

    if (voucher.inventoryNumber <= 0) {
      this.cronServices.createScheduleCloseVoucher(body.endDate, voucherId)
    }

    return this.voucherRepository.update(body, { where: { id: voucherId } })
  }

  async getListVoucher(pagination: Pagination) {
    const { skip, limit, sort, search } = pagination

    const whereClause: WhereOptions<Voucher> = {
      inventoryNumber: {
        [Op.gte]: 1,
      },
      ...search,
    }

    return this.voucherRepository.getListVoucher(whereClause, skip, limit, sort)
  }

  async getListVoucherByUser(pagination: Pagination, userId: number) {
    const { skip, limit, sort, search } = pagination

    const whereClause: WhereOptions<Voucher> = {
      inventoryNumber: {
        [Op.gte]: 1,
      },
      ...search,
    }

    return this.voucherRepository.getListVoucherByUser(whereClause, skip, limit, sort, userId)
  }
}

export default VoucherServices
