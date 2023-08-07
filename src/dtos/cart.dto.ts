import { isValidEmail } from '@decorators/is.email.decorator'
import { IsAlreadyExist } from '@decorators/is.exist.decorator'
import { isValidPhoneNumber } from '@decorators/is.phoneNumber.decorator'
import { IsNotExist } from '@decorators/isNot.exist.decorator'
import { File } from '@interfaces/file.interface'
import { IsNotEmpty, IsNumber, IsEnum, IsString, IsOptional, IsDateString } from 'class-validator'
import { Transform, Type, TransformFnParams } from 'class-transformer'
import moment from 'moment-timezone'
import { checkEndDate } from '@decorators/check.endDate.decorator'

export class AddItemToCartDto {
  @IsNotEmpty()
  @IsNumber()
  @IsAlreadyExist('items', 'id')
  itemId: number

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}
