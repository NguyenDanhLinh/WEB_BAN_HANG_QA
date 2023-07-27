import {
  Get,
  JsonController,
  Req,
  Res,
  Post,
  UseBefore,
  Body,
  UploadedFiles,
} from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import ItemServices from '@services/item.service'
import { createFileUploadOption } from '@lib/file'
import { FileEnum } from '@enum/file.enum'
import { File } from '@interfaces/file.interface'
import { CreateItemDto, UpdateItemDto } from 'dtos/item.dto'

@JsonController('/items')
@Service()
export class ItemController extends BaseController {
  constructor(protected itemServices: ItemServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @UseBefore(validationMiddleware(CreateItemDto, 'body'))
  @Post('/create')
  async createItem(@Body() body: CreateItemDto, @Res() res: any) {
    const result = await this.itemServices.createItem(body)

    return this.responseSuccess(result, 'Success', res)
  }

  @UseBefore(AdminMiddleware)
  @UseBefore(validationMiddleware(UpdateItemDto, 'body'))
  @Post('/update')
  async updateItem(@Body() body: UpdateItemDto, @Res() res: any) {
    const result = await this.itemServices.updateItem(body)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default ItemController
