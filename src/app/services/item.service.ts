import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'
import CategoryRepository from '@repositories/category.repository'
import ItemRepository from '@repositories/item.repository'
import { File } from '@interfaces/file.interface'
import { CreateItemInterface, UpdateItemInterface } from '@interfaces/item.interface'
import { UploadToFilebaseService } from '@common/services/upload_file.service'

@Service()
class ItemServices {
  constructor(
    protected itemRepository: ItemRepository,
    protected cronServices: CronServices,
    protected uploadToFilebaseService: UploadToFilebaseService,
  ) {}

  async createItem(body: CreateItemInterface) {
    body.barcode = this.generateRandomBarcode()

    return this.itemRepository.create(body)
  }

  async updateItem(body: UpdateItemInterface) {
    const itemId = body.id

    delete body.id

    return this.itemRepository.update(body, { where: { id: itemId } })
  }

  generateRandomBarcode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength)
      result += characters.charAt(randomIndex)
    }

    return result
  }
}

export default ItemServices
