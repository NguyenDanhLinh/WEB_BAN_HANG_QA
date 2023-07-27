import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { OrderItemRepositoryInterface } from './interfaces/order_item.repository.interface'
import OrderItem from '@models/entities/order_item.entity'

@Service({ global: true })
class OrderItemRepository
  extends BaseRepository<OrderItem>
  implements OrderItemRepositoryInterface<OrderItem>
{
  constructor(@ModelContainer(OrderItem.tableName) OrderItem: ModelCtor<OrderItem>) {
    super(OrderItem)
  }
}

export default OrderItemRepository
