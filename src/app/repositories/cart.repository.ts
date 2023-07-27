import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Cart from '@models/entities/carts.entity'
import { CartRepositoryInterface } from './interfaces/cart.repository.interface'

@Service({ global: true })
class CartRepository extends BaseRepository<Cart> implements CartRepositoryInterface<Cart> {
  constructor(@ModelContainer(Cart.tableName) Cart: ModelCtor<Cart>) {
    super(Cart)
  }
}

export default CartRepository
