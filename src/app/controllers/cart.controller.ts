import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import CartServices from '@services/cart.service'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { AddItemToCartDto, DeleteItemToCartDto, IncrementItemToCartDto } from 'dtos/cart.dto'
import { RequestWithUser } from '@interfaces/auth.interface'
import { PaginationQueryDto } from 'dtos/pagination.dto'
import { GetPagination } from '@decorators/get.pagination.decorator'
import { Pagination } from '@interfaces/pagination.interface'
import { Response } from 'express'

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

  @Get('/list-item')
  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(PaginationQueryDto, 'query'))
  async getListItemInCart(
    @GetPagination() pagination: Pagination,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const result = await this.cartServices.getListItemInCart(pagination, req.user.id)

    return this.responseSuccess(result, 'Success', res)
  }

  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(DeleteItemToCartDto, 'body'))
  @Post('/delete-item')
  async deleteItemToCart(
    @Body() body: DeleteItemToCartDto,
    @Req() req: RequestWithUser,
    @Res() res: any,
  ) {
    const result = await this.cartServices.deleteItemToCart(body, req.user.id)

    return this.responseSuccess(result, 'Success', res)
  }

  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(IncrementItemToCartDto, 'body'))
  @Post('/increment-item')
  async incrementItemToCart(
    @Body() body: IncrementItemToCartDto,
    @Req() req: RequestWithUser,
    @Res() res: any,
  ) {
    const result = await this.cartServices.incrementItemToCart(body, req.user.id)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default CartController
