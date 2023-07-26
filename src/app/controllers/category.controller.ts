import {
  Get,
  JsonController,
  Req,
  Res,
  Post,
  UseBefore,
  Body,
  UploadedFiles,
} from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import CategoryServices from '@services/category.service'
import { createFileUploadOption } from '@lib/file'
import { FileEnum } from '@enum/file.enum'
import { File } from '@interfaces/file.interface'
import { CreateCategoryDto, UpdateCategoryDto } from 'dtos/category.dto'

@JsonController('/category')
@Service()
export class CategoryController extends BaseController {
  constructor(protected categoryServices: CategoryServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @Post('/create')
  async createCategory(
    @UploadedFiles('file', {
      options: createFileUploadOption(
        /\/(jpg|jpeg|png|gif)$/,
        FileEnum.MAX_SIZE_IMAGE,
        FileEnum.MAX_QTY_IMAGE,
      ),
    })
    file: File,
    @Body() body: CreateCategoryDto,
    @Res() res: any,
  ) {
    const result = await this.categoryServices.createCategory(file, body)

    return this.responseSuccess(result, 'Success', res)
  }

  @UseBefore(AdminMiddleware)
  @Post('/update')
  async updateCategory(
    @UploadedFiles('file', {
      options: createFileUploadOption(
        /\/(jpg|jpeg|png|gif)$/,
        FileEnum.MAX_SIZE_IMAGE,
        FileEnum.MAX_QTY_IMAGE,
      ),
    })
    file: File,
    @Body() body: UpdateCategoryDto,
    @Res() res: any,
  ) {
    await this.categoryServices.updateCategory(file, body)

    return this.responseSuccess([], 'Success', res)
  }
}

export default CategoryController
