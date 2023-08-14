import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import UserServices from '@services/users.service'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto, ReceiveVoucherDto, VerifyEmailDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import { RequestWithUser } from '@interfaces/auth.interface'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { GetPagination } from '@decorators/get.pagination.decorator'
import { Pagination } from '@interfaces/pagination.interface'
import { Response } from 'express'
import { PaginationQueryParams } from '@decorators/pagination.query.decorator'

@JsonController('/user')
@Service()
export class UsersController extends BaseController {
  constructor(protected userServices: UserServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @Get('/list')
  async getUser(@Res() res: any) {
    const findAllUsersData = await this.userServices.getAll()

    return this.responseSuccess(findAllUsersData, 'Success', res)
  }

  @Post('/create')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  async createUser(@Body() body: CreateUserDto, @Req() req: any, @Res() res: any) {
    await this.userServices.createUser(body)

    return this.responseSuccess([], 'Success', res)
  }

  @Post('/login')
  @UseBefore(validationMiddleware(UserLoginDto, 'body'))
  async userLogin(@Body() body: UserLoginDto, @Req() req: any, @Res() res: any) {
    const jwt = await this.userServices.userLogin(body)

    return this.responseSuccess(jwt, 'Success', res)
  }

  @Post('/receive-voucher')
  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(ReceiveVoucherDto, 'body'))
  async receiveVoucher(
    @Body() body: ReceiveVoucherDto,
    @Req() req: RequestWithUser,
    @Res() res: any,
  ) {
    await this.userServices.receiveVoucher(body.voucherId, req.user.id)

    return this.responseSuccess([], 'Success', res)
  }

  @Get('/verify-email')
  @UseBefore(validationMiddleware(VerifyEmailDto, 'query'))
  async verifyEmail(@PaginationQueryParams() params: VerifyEmailDto, @Res() res: Response) {
    const result = await this.userServices.verifyEmail(params.token)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default UsersController
