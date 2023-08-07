import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Cart from '@models/entities/carts.entity'
import { CartRepositoryInterface } from './interfaces/cart.repository.interface'
import { Transaction, WhereOptions } from 'sequelize'

@Service({ global: true })
class CartRepository extends BaseRepository<Cart> implements CartRepositoryInterface<Cart> {
  constructor(@ModelContainer(Cart.tableName) Cart: ModelCtor<Cart>) {
    super(Cart)
  }

  async create(param, transaction?: Transaction): Promise<Cart> {
    return this.model.create(param, { transaction: transaction })
  }

  async findOrCreate(
    whereClause: WhereOptions<Cart>,
    transaction?: Transaction,
  ): Promise<[Cart, boolean]> {
    return this.model.findOrCreate({
      where: whereClause,
      transaction,
    })
  }
}

export default CartRepository
