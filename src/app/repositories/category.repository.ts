import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { CategoryRepositoryInterface } from './interfaces/category.repository.interface'
import Category from '@models/entities/categories.entity'

@Service({ global: true })
class CategoryRepository
  extends BaseRepository<Category>
  implements CategoryRepositoryInterface<Category>
{
  constructor(@ModelContainer(Category.tableName) Category: ModelCtor<Category>) {
    super(Category)
  }
}

export default CategoryRepository
