import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Order from '@models/entities/order.entity'
import { OrderRepositoryInterface } from './interfaces/order.repository.interface'

@Service({ global: true })
class OrderRepository extends BaseRepository<Order> implements OrderRepositoryInterface<Order> {
  constructor(@ModelContainer(Order.tableName) Order: ModelCtor<Order>) {
    super(Order)
  }
}

export default OrderRepository
