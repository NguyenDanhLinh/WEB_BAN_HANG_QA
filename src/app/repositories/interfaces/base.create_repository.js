// import { Model } from 'sequelize'
// import { BaseRepositoryInterface } from './base.repository.interface'

// export interface CategoryRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}

// import { Service } from 'typedi'
// import { ModelCtor } from 'sequelize-typescript'
// import { BaseRepository } from './base.repository'
// import { ModelContainer } from '@decorators/model.decorator'

// @Service({ global: true })
// class CategoryRepository
//   extends BaseRepository<Category>
//   implements CategoryRepositoryInterface<Category>
// {
//   constructor(@ModelContainer(Category.tableName) Category: ModelCtor<Category>) {
//     super(Category)
//   }
// }

// export default CategoryRepository
