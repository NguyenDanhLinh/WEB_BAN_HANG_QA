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
import UploadServices from '@services/upload.service'
import { File } from '@interfaces/file.interface'
import { createFileUploadOption } from '@lib/file'
import { FileEnum } from '@enum/file.enum'

@JsonController('/upload')
@Service()
export class UploadController extends BaseController {
  constructor(protected uploadServices: UploadServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
  @Post('/img')
  async upload(
    @UploadedFiles('file', {
      options: createFileUploadOption(
        /\/(jpg|jpeg|png|gif)$/,
        FileEnum.MAX_SIZE_IMAGE,
        FileEnum.MAX_QTY_IMAGE,
      ),
    })
    file: File,
    @Res() res: any,
  ) {
    const result = await this.uploadServices.upload(file)

    return this.responseSuccess(result, 'Success', res)
  }
}

export default UploadController
