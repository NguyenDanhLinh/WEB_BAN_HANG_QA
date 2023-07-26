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
import { CreateCategoryInterface } from '@interfaces/category.interface'

@Service()
class CategoryServices {
  constructor(
    protected categoryRepository: CategoryRepository,
    protected cronServices: CronServices,
    protected uploadToFilebaseService: UploadToFilebaseService,
  ) {}

  async createCategory(file: File, body: CreateCategoryInterface) {
    const img = await this.uploadToFilebaseService.uploadFile(file[0])
    body.img = img

    return this.categoryRepository.create(body)
  }
}

export default CategoryServices
