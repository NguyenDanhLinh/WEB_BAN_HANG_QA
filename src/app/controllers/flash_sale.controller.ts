import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import FlashSaleServices from '@services/flash_sale.service'
import { CreateFlashSaleDto, GetFlashSaleDto } from 'dtos/flashSale.dto'
import { PaginationQueryDto } from 'dtos/pagination.dto'
import { GetPagination } from '@decorators/get.pagination.decorator'
import { Pagination } from '@interfaces/pagination.interface'
import { Response } from 'express'
import { PaginationQueryParams } from '@decorators/pagination.query.decorator'

@JsonController('/flash-sale')
@Service()
export class FlashSaleController extends BaseController {
  constructor(protected flashSaleServices: FlashSaleServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @UseBefore(validationMiddleware(CreateFlashSaleDto, 'body'))
  @Post('/create')
  async createFlashSale(@Body() body: CreateFlashSaleDto, @Res() res: any) {
    const result = await this.flashSaleServices.createFlashSale(body)

    return this.responseSuccess(result, 'Success', res)
  }

  @Get('/list')
  @UseBefore(validationMiddleware(GetFlashSaleDto, 'query'))
  async getFlashSale(
    @GetPagination() pagination: Pagination,
    @PaginationQueryParams() params: GetFlashSaleDto,
    @Res() res: Response,
  ) {
    const result = await this.flashSaleServices.getFlashSale(pagination, params)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default FlashSaleController
