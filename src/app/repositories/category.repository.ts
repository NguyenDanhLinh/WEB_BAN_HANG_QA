import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { CategoryRepositoryInterface } from './interfaces/category.repository.interface'
import Category from '@models/entities/categories.entity'
import { WhereOptions } from 'sequelize'

@Service({ global: true })
class CategoryRepository
  extends BaseRepository<Category>
  implements CategoryRepositoryInterface<Category>
{
  constructor(@ModelContainer(Category.tableName) Category: ModelCtor<Category>) {
    super(Category)
  }

  async getListCategories(
    whereClause: WhereOptions<Category>,
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

export default CategoryRepository
