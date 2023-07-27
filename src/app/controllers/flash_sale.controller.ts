import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import FlashSaleServices from '@services/flash_sale.service'

@JsonController('/flash-sale')
@Service()
export class FlashSaleController extends BaseController {
  constructor(protected flashSaleServices: FlashSaleServices) {
    super()
  }
}

export default FlashSaleController
