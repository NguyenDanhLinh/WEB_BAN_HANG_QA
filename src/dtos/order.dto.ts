import { isValidEmail } from '@decorators/is.email.decorator'
import { IsAlreadyExist } from '@decorators/is.exist.decorator'
import { isValidPhoneNumber } from '@decorators/is.phoneNumber.decorator'
import { IsNotExist } from '@decorators/isNot.exist.decorator'
import { File } from '@interfaces/file.interface'
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
} from 'class-validator'
import { Transform, Type, TransformFnParams } from 'class-transformer'
import moment from 'moment-timezone'
import { checkEndDate } from '@decorators/check.endDate.decorator'
import { IsAlreadyExistWithArray } from '@decorators/is.existWithArray.decorator'

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @IsAlreadyExist('voucher', 'id')
  voucherId: number

  @IsArray()
  @IsNotEmpty()
  @IsAlreadyExistWithArray('items', 'id', ['itemId', 'quantity'])
  items: Array<{ itemId: any; quantity: any }>
}
