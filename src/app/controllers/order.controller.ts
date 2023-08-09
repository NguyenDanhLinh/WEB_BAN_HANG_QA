import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import OrderServices from '@services/order.service'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { CreateOrderDto } from 'dtos/order.dto'
import { RequestWithUser } from '@interfaces/auth.interface'

@JsonController('/orders')
@Service()
export class OrderController extends BaseController {
  constructor(protected orderServices: OrderServices) {
    super()
  }

  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(CreateOrderDto, 'body'))
  @Post('/create')
  async createOrder(@Body() body: CreateOrderDto, @Req() req: RequestWithUser, @Res() res: any) {
    const result = await this.orderServices.createOrder(body, req.user.id)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default OrderController
