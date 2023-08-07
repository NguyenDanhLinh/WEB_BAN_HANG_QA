import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import VoucherServices from '@services/voucher.service'
import { CreateVoucherDto, UpdateVoucherDto } from 'dtos/voucher.dto'

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
}

export default VoucherController
