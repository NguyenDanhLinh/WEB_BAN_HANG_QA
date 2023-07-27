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

@Service()
class UploadServices {
  constructor(protected uploadToFilebaseService: UploadToFilebaseService) {}

  async upload(file: File) {
    if (!file[0]) {
      throw new HttpException(400, 'file not found')
    }

    return this.uploadToFilebaseService.uploadFile(file[0])
  }
}

export default UploadServices
