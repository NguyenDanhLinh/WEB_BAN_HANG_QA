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
import { PaginationQueryDto } from './pagination.dto'

export class CreateFlashSaleDto {
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
  @IsAlreadyExistWithArray('items', 'id', ['itemId', 'quantity', 'percent', 'moneyReduced'])
  items: Array<{ itemId: any; quantity: any; percent: any; moneyReduced: any }>
}

export class GetFlashSaleDto extends PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsAlreadyExist('flash_sale', 'id')
  id: number
}
