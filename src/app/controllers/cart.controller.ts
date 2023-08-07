import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import CartServices from '@services/cart.service'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { AddItemToCartDto } from 'dtos/cart.dto'
import { RequestWithUser } from '@interfaces/auth.interface'

@JsonController('/carts')
@Service()
export class CartController extends BaseController {
  constructor(protected cartServices: CartServices) {
    super()
  }

  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(AddItemToCartDto, 'body'))
  @Post('/add-item')
  async addItemToCart(
    @Body() body: AddItemToCartDto,
    @Req() req: RequestWithUser,
    @Res() res: any,
  ) {
    const result = await this.cartServices.addItemToCart(body, req.user.id)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default CartController
