import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import CategoryRepository from '@repositories/category.repository'
import OrderRepository from '@repositories/order.repository'
import { CreateOrderInterface } from '@interfaces/order.interface'
import ItemRepository from '@repositories/item.repository'
import Item from '@models/entities/items.entity'
import DB from '@models/index'
import FlashSaleItemRepository from '@repositories/flashSale_item.repository'
import { LoggingException } from '@exceptions/logging.exception'
import Cart from '@models/entities/carts.entity'
import CartItemRepository from '@repositories/cart_item.repository'
import CartRepository from '@repositories/cart.repository'
import Voucher from '@models/entities/voucher.entity'
import VoucherRepository from '@repositories/voucher.repository'
import OrderItemRepository from '@repositories/order_item.repository'
import UserVoucherRepository from '@repositories/user_voucher.repository'
import { Op } from 'sequelize'

@Service()
class OrderServices {
  constructor(
    protected orderRepository: OrderRepository,
    protected cronServices: CronServices,
    protected itemRepository: ItemRepository,
    protected flashSaleItemRepository: FlashSaleItemRepository,
    protected cartItemRepository: CartItemRepository,
    protected cartRepository: CartRepository,
    protected voucherRepository: VoucherRepository,
    protected orderItemRepository: OrderItemRepository,
    protected userVoucherRepository: UserVoucherRepository,
  ) {}

  checkTimeVoucher(voucherTime: Date): boolean {
    const currentTimestamp = new Date().getTime()
    const targetTimestamp = new Date(voucherTime).getTime()

    return targetTimestamp < currentTimestamp
  }

  async createOrder(body: CreateOrderInterface, userId: number) {
    const { items } = body

    const voucherId = body.voucherId ? body.voucherId : 0
    let voucher = null

    const cart: Cart = await this.cartRepository.findByCondition({ where: { userId } })
    let userVoucher = await this.userVoucherRepository.getUserVoucher({ voucherId, userId })

    if (userVoucher) {
      voucher = userVoucher.voucher

      userVoucher = this.checkTimeVoucher(voucher.startDate) ? userVoucher : null
    }

    let totalPrice = 0
    const listItemId = []

    const transaction = await DB.sequelize.transaction()

    try {
      const itemsParam = await Promise.all(
        items.map(async (item) => {
          if (item.quantity <= 0) {
            throw new HttpException(400, 'quantity not valid')
          }

          listItemId.push(item.itemId)

          const itemRecord: Item = await this.itemRepository.getItems({ id: item.itemId })

          if (itemRecord.inventoryNumber < item.quantity) {
            throw new HttpException(400, 'quantity k is enough')
          }

          let price = item.quantity * parseInt(itemRecord.outputPrice)

          if (itemRecord.flashSaleItem.length > 0) {
            price =
              (item.quantity - 1) * parseInt(itemRecord.outputPrice) +
              parseInt(itemRecord.outputPrice) -
              parseInt(itemRecord.outputPrice) * (itemRecord.flashSaleItem[0].percent / 100) -
              parseInt(itemRecord.flashSaleItem[0].moneyReduced)

            price = price < 0 ? 0 : price

            await this.flashSaleItemRepository.decrement(
              'quantity',
              itemRecord.flashSaleItem[0].id,
              1,
              transaction,
            )

            item.flashSaleId = itemRecord.flashSaleItem[0].flashSale.id
          }

          await this.itemRepository.decrement(
            'inventoryNumber',
            item.itemId,
            item.quantity,
            transaction,
          )

          totalPrice += price

          return { ...item, price: price }
        }),
      )

      if (userVoucher) {
        await this.userVoucherRepository.deleteByCondition({ voucherId, userId }, transaction)

        totalPrice =
          totalPrice - totalPrice * (voucher.percent / 100) - parseInt(voucher.moneyReduced)

        totalPrice = totalPrice < 0 ? 0 : totalPrice
      }

      const order = await this.orderRepository.create(
        {
          userId,
          voucherId: voucher ? voucher.id : null,
          totalPrice: totalPrice,
        },
        transaction,
      )

      await Promise.all(
        itemsParam.map((item) => {
          return this.orderItemRepository.create({ ...item, orderId: order.id }, transaction)
        }),
      )

      if (cart) {
        await this.cartItemRepository.deleteByCondition(
          {
            cartId: cart.id,
            itemId: {
              [Op.in]: listItemId,
            },
          },
          transaction,
        )
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()

      throw new LoggingException(400, error.message, { body, userId })
    }
  }
}

export default OrderServices
