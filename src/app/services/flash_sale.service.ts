import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import CategoryRepository from '@repositories/category.repository'
import FlashSaleRepository from '@repositories/flash_sale.repository'
import { CreateFlashSaleInterface } from '@interfaces/flashSale.interface'
import ItemRepository from '@repositories/item.repository'
import DB from '@models/index'
import { LoggingException } from '@exceptions/logging.exception'
import FlashSaleItem from '@models/entities/flashSale_item.entity'
import FlashSaleItemRepository from '@repositories/flashSale_item.repository'

@Service()
class FlashSaleServices {
  constructor(
    protected flashSaleRepository: FlashSaleRepository,
    protected cronServices: CronServices,
    protected itemRepository: ItemRepository,
    protected userRepository: UserRepository,
    protected flashSaleItemRepository: FlashSaleItemRepository,
  ) {}

  async createFlashSale(body: CreateFlashSaleInterface) {
    const items = body.items

    delete body.items

    const transaction = await DB.sequelize.transaction()

    const user = await this.userRepository.getAll({ attributes: ['email'] })

    const listEmail = user.map((obj) => obj.email)

    try {
      const flashSale = await this.flashSaleRepository.create(body, transaction)

      await Promise.all(
        items.map((item) => {
          return this.itemRepository.getItems({ id: item.itemId }).then((itemRecord) => {
            if (
              parseInt(item.moneyReduced) >= parseInt(itemRecord.outputPrice) ||
              item.percent >= 100
            ) {
              throw new HttpException(400, 'The amount of reduction is too big')
            }

            if (itemRecord.flashSaleItem.length > 0) {
              return
            }

            return this.flashSaleItemRepository.create(
              { flashSaleId: flashSale.id, ...item },
              transaction,
            )
          })
        }),
      )

      transaction.commit()

      this.cronServices.createScheduleCloseFlashSale(body.endDate, flashSale.id)

      this.cronServices.createScheduleStartFlashSale(body.startDate, flashSale.id, listEmail)

      return flashSale
    } catch (error) {
      transaction.rollback()

      throw new LoggingException(400, error.message, { body })
    }
  }
}

export default FlashSaleServices
