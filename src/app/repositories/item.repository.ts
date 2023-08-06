import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { ItemRepositoryInterface } from './interfaces/item.repository.interface'
import Item from '@models/entities/items.entity'
import { WhereOptions } from 'sequelize'

@Service({ global: true })
class ItemRepository extends BaseRepository<Item> implements ItemRepositoryInterface<Item> {
  constructor(@ModelContainer(Item.tableName) Item: ModelCtor<Item>) {
    super(Item)
  }

  async getListItems(
    whereClause: WhereOptions<Item>,
    offset: number,
    limit: number,
    orderBy: any,
  ): Promise<any> {
    return this.model.findAndCountAll({
      where: whereClause,
      order: orderBy,
      offset,
      limit,
    })
  }
}

export default ItemRepository
