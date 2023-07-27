import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import VoucherServices from '@services/voucher.service'

@JsonController('/voucher')
@Service()
export class VoucherController extends BaseController {
  constructor(protected voucherServices: VoucherServices) {
    super()
  }
}

export default VoucherController
