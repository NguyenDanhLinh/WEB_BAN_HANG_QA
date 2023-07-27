import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import CartServices from '@services/cart.service'

@JsonController('/carts')
@Service()
export class CartController extends BaseController {
  constructor(protected cartServices: CartServices) {
    super()
  }
}

export default CartController
