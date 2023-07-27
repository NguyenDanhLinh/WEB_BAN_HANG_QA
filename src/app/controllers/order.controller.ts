import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import OrderServices from '@services/order.service'

@JsonController('/orders')
@Service()
export class OrderController extends BaseController {
  constructor(protected orderServices: OrderServices) {
    super()
  }
}

export default OrderController
