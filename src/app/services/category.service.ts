import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import CategoryRepository from '@repositories/category.repository'
import { UploadToFilebaseService } from '@common/services/upload_file.service'
import { File } from '@interfaces/file.interface'
import { CreateCategoryInterface, UpdateCategoryInterface } from '@interfaces/category.interface'
import { Pagination } from '@interfaces/pagination.interface'
import { WhereOptions } from 'sequelize'
import Category from '@models/entities/categories.entity'
import { StatusCategoryEnum } from '@enum/categories.enum'

@Service()
class CategoryServices {
  constructor(
    protected categoryRepository: CategoryRepository,
    protected cronServices: CronServices,
    protected uploadToFilebaseService: UploadToFilebaseService,
  ) {}

  async createCategory(file: File, body: CreateCategoryInterface) {
    if (!file[0]) {
      throw new HttpException(400, 'file not found')
    }

    const img = await this.uploadToFilebaseService.uploadFile(file[0])
    body.img = img

    return this.categoryRepository.create(body)
  }

  async updateCategory(file: File, body: UpdateCategoryInterface) {
    if (!file[0] && !body.name) {
      throw new HttpException(400, 'info update not found')
    }

    if (file[0]) {
      const img = await this.uploadToFilebaseService.uploadFile(file[0])
      body.img = img
    }

    const categoryId = body.id

    delete body.id

    return this.categoryRepository.update(body, { where: { id: categoryId } })
  }

  async getListCategories(pagination: Pagination) {
    const { skip, limit, sort, search } = pagination

    const whereClause: WhereOptions<Category> = {
      status: StatusCategoryEnum.ACTIVE,
      ...search,
    }

    return this.categoryRepository.getListCategories(whereClause, skip, limit, sort)
  }

  async deleteCategory(id: number) {
    return this.categoryRepository.deleteById(id)
  }
}

export default CategoryServices
