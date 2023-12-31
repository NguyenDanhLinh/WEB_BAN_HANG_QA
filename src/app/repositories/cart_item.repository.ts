import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import CartItem from '@models/entities/cart_item.entity'
import { CartItemRepositoryInterface } from './interfaces/cart_item.repository.interface'
import { Transaction, WhereAttributeHashValue } from 'sequelize'

@Service({ global: true })
class CartItemRepository
  extends BaseRepository<CartItem>
  implements CartItemRepositoryInterface<CartItem>
{
  constructor(@ModelContainer(CartItem.tableName) CartItem: ModelCtor<CartItem>) {
    super(CartItem)
  }

  async create(param, transaction?: Transaction): Promise<CartItem> {
    return this.model.create(param, { transaction: transaction })
  }

  async increment(
    field: keyof CartItem,
    id: WhereAttributeHashValue<number>,
    amount: number,
    transaction?: Transaction,
  ): Promise<[affectedRows: CartItem[], affectedCount?: number]> {
    return this.model.increment(
      {
        [field]: amount,
      },
      {
        where: {
          id,
        },
        transaction,
      },
    )
  }
}

export default CartItemRepository
