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

export class CreateFlashSaleDto {
  @IsNotEmpty()
  @IsNumber()
  percent: number

  @IsNotEmpty()
  @IsString()
  moneyReduced: string

  @IsNotEmpty()
  @IsDateString()
  @checkEndDate()
  @Transform(({ value }: TransformFnParams) => moment(value, 'YYYY-MM-DD HH:mm:ss Z').toISOString())
  startDate: Date

  @IsNotEmpty()
  @IsDateString()
  @checkEndDate()
  @Transform(({ value }: TransformFnParams) => moment(value, 'YYYY-MM-DD HH:mm:ss Z').toISOString())
  endDate: Date

  @IsArray()
  @IsNotEmpty()
  @IsAlreadyExistWithArray('items', 'id', ['itemId', 'quantity'])
  items: Array<{}>
}
