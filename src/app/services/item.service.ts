import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import CategoryRepository from '@repositories/category.repository'
import ItemRepository from '@repositories/item.repository'
import { File } from '@interfaces/file.interface'
import { CreateItemInterface, UpdateItemInterface } from '@interfaces/item.interface'
import { UploadToFilebaseService } from '@common/services/upload_file.service'
import { Pagination } from '@interfaces/pagination.interface'
import { WhereOptions } from 'sequelize'
import Item from '@models/entities/items.entity'
import FlashSaleItemRepository from '@repositories/flashSale_item.repository'
import CartItemRepository from '@repositories/cart_item.repository'
import CartRepository from '@repositories/cart.repository'
import VoucherRepository from '@repositories/voucher.repository'
import UserVoucherRepository from '@repositories/user_voucher.repository'
import OrderItemRepository from '@repositories/order_item.repository'
import { LoggingException } from '@exceptions/logging.exception'
import DB from '@models/index'

@Service()
class ItemServices {
  constructor(
    protected itemRepository: ItemRepository,
    protected cronServices: CronServices,
    protected uploadToFilebaseService: UploadToFilebaseService,
    protected flashSaleItemRepository: FlashSaleItemRepository,
    protected cartItemRepository: CartItemRepository,
    protected cartRepository: CartRepository,
    protected voucherRepository: VoucherRepository,
    protected orderItemRepository: OrderItemRepository,
    protected userVoucherRepository: UserVoucherRepository,
  ) {}

  async createItem(body: CreateItemInterface) {
    body.barcode = this.generateRandomBarcode()

    return this.itemRepository.create(body)
  }

  async updateItem(body: UpdateItemInterface) {
    const itemId = body.id

    delete body.id

    return this.itemRepository.update(body, { where: { id: itemId } })
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

  async getListItems(pagination: Pagination) {
    const { skip, limit, sort, search } = pagination

    const whereClause: WhereOptions<Item> = {
      ...search,
    }

    return this.itemRepository.getListItems(whereClause, skip, limit, sort)
  }

  async deleteItem(itemId: number) {
    const transaction = await DB.sequelize.transaction()

    try {
      await this.itemRepository.deleteById(itemId, transaction)

      await this.cartItemRepository.deleteByCondition({ itemId }, transaction)

      await this.flashSaleItemRepository.deleteByCondition({ itemId }, transaction)

      transaction.commit()

      return true
    } catch (error) {
      transaction.rollback()

      throw new LoggingException(400, error.message, { itemId })
    }
  }
}

export default ItemServices
