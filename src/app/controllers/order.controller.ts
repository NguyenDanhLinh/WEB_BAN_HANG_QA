import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import OrderServices from '@services/order.service'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { CreateOrderDto, GetOrderDto } from 'dtos/order.dto'
import { RequestWithUser } from '@interfaces/auth.interface'
import { GetPagination } from '@decorators/get.pagination.decorator'
import { Pagination } from '@interfaces/pagination.interface'
import { Response } from 'express'
import { PaginationQueryParams } from '@decorators/pagination.query.decorator'

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

  @UseBefore(AdminMiddleware)
  @Get('/get')
  @UseBefore(validationMiddleware(GetOrderDto, 'query'))
  async getOrder(
    @GetPagination() pagination: Pagination,
    @PaginationQueryParams() params: GetOrderDto,
    @Res() res: Response,
  ) {
    const result = await this.orderServices.getOrder(pagination, params)

    return this.responseSuccess(result, 'Success', res)
  }

  @UseBefore(UserMiddleware)
  @Get('/get-by-user')
  @UseBefore(validationMiddleware(GetOrderDto, 'query'))
  async getOrderByUser(
    @GetPagination() pagination: Pagination,
    @PaginationQueryParams() params: GetOrderDto,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const result = await this.orderServices.getOrder(pagination, params, req.user.id)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default OrderController
