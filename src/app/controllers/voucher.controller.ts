import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import VoucherServices from '@services/voucher.service'
import { CreateVoucherDto, UpdateVoucherDto } from 'dtos/voucher.dto'
import { GetPagination } from '@decorators/get.pagination.decorator'
import { Pagination } from '@interfaces/pagination.interface'
import { Response } from 'express'
import { PaginationQueryDto } from 'dtos/pagination.dto'
import { UserMiddleware } from '@middlewares/checkUser.middleware'
import { RequestWithUser } from '@interfaces/auth.interface'

@JsonController('/voucher')
@Service()
export class VoucherController extends BaseController {
  constructor(protected voucherServices: VoucherServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @UseBefore(validationMiddleware(CreateVoucherDto, 'body'))
  @Post('/create')
  async createVoucher(@Body() body: CreateVoucherDto, @Res() res: any) {
    const result = await this.voucherServices.createVoucher(body)

    return this.responseSuccess(result, 'Success', res)
  }

  @UseBefore(AdminMiddleware)
  @UseBefore(validationMiddleware(UpdateVoucherDto, 'body'))
  @Post('/update')
  async updateVoucher(@Body() body: UpdateVoucherDto, @Res() res: any) {
    const result = await this.voucherServices.updateVoucher(body)

    return this.responseSuccess(result, 'Success', res)
  }

  @Get('/list')
  @UseBefore(validationMiddleware(PaginationQueryDto, 'query'))
  async getListVoucher(@GetPagination() pagination: Pagination, @Res() res: Response) {
    const result = await this.voucherServices.getListVoucher(pagination)

    return this.responseSuccess(result, 'Success', res)
  }

  @Get('/list-by-user')
  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(PaginationQueryDto, 'query'))
  async getListVoucherByUser(
    @GetPagination() pagination: Pagination,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const result = await this.voucherServices.getListVoucherByUser(pagination, req.user.id)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default VoucherController
