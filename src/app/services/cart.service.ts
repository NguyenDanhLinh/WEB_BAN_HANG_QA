import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import CategoryRepository from '@repositories/category.repository'
import CartRepository from '@repositories/cart.repository'
import { AddItemToCart, DeleteItemToCart, IncrementItemToCart } from '@interfaces/cart.interface'
import ItemRepository from '@repositories/item.repository'
import DB from '@models/index'
import { LoggingException } from '@exceptions/logging.exception'
import CartItemRepository from '@repositories/cart_item.repository'
import { Pagination } from '@interfaces/pagination.interface'
import { Op, WhereOptions } from 'sequelize'
import Cart from '@models/entities/carts.entity'

@Service()
class CartServices {
  constructor(
    protected cartRepository: CartRepository,
    protected cronServices: CronServices,
    protected itemRepository: ItemRepository,
    protected cartItemRepository: CartItemRepository,
  ) {}

  async addItemToCart(body: AddItemToCart, userId: number) {
    const item = await this.itemRepository.findById(body.itemId)

    if (item.inventoryNumber < body.quantity) {
      throw new HttpException(400, 'quantity item is out')
    }

    const transaction = await DB.sequelize.transaction()

    try {
      const [cart] = await this.cartRepository.findOrCreate({ userId }, transaction)

      const cartItem = await this.cartItemRepository.create(
        { cartId: cart.id, ...body },
        transaction,
      )

      transaction.commit()

      return cartItem
    } catch (error) {
      transaction.rollback()

      throw new LoggingException(400, error.message, { body, userId })
    }
  }

  async getListItemInCart(pagination: Pagination, userId: number) {
    const { skip, limit, sort } = pagination

    const whereClause: WhereOptions<Cart> = {
      userId,
    }

    return this.cartRepository.getListItemInCart(whereClause, skip, limit, sort)
  }

  async deleteItemToCart(body: DeleteItemToCart, userId: number) {
    const cart = await this.cartRepository.findByCondition({ where: { userId } })

    return this.cartItemRepository.deleteByCondition({ cartId: cart.id, itemId: body.itemId })
  }

  async incrementItemToCart(body: IncrementItemToCart, userId: number) {
    const cart = await this.cartRepository.findByCondition({ where: { userId } })

    const cartItem = await this.cartItemRepository.findByCondition({
      where: { cartId: cart.id, itemId: body.itemId },
    })

    let quantityIncrement = body.quantity ? body.quantity : 1

    const item = await this.itemRepository.findById(body.itemId)

    if (quantityIncrement + cartItem.quantity > item.inventoryNumber) {
      throw new HttpException(400, 'the number of inventory_number is not enough')
    }

    return this.cartItemRepository.increment('quantity', cartItem.id, quantityIncrement)
  }
}

export default CartServices
