import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import ItemServices from '@services/item.service'

@JsonController('/items')
@Service()
export class ItemController extends BaseController {
  constructor(protected itemServices: ItemServices) {
    super()
  }
}

export default ItemController
