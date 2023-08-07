import { isValidEmail } from '@decorators/is.email.decorator'
import { IsAlreadyExist } from '@decorators/is.exist.decorator'
import { isValidPhoneNumber } from '@decorators/is.phoneNumber.decorator'
import { IsNotExist } from '@decorators/isNot.exist.decorator'
import { File } from '@interfaces/file.interface'
import { IsNotEmpty, IsNumber, IsEnum, IsString, IsOptional, IsDateString } from 'class-validator'
import { Transform, Type, TransformFnParams } from 'class-transformer'
import moment from 'moment-timezone'
import { checkEndDate } from '@decorators/check.endDate.decorator'

export class CreateVoucherDto {
  @IsNotEmpty()
  @IsString()
  @IsNotExist('voucher', 'name')
  name: string

  @IsNotEmpty()
  @IsNumber()
  percent: number

  @IsNotEmpty()
  @IsString()
  moneyReduced: string

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => moment(value, 'YYYY-MM-DD HH:mm:ss Z').toISOString())
  startDate: Date

  @IsNotEmpty()
  @IsDateString()
  @checkEndDate()
  @Transform(({ value }: TransformFnParams) => moment(value, 'YYYY-MM-DD HH:mm:ss Z').toISOString())
  endDate: Date

  @IsNotEmpty()
  @IsNumber()
  inventoryNumber: number
}

export class UpdateVoucherDto {
  @IsNotEmpty()
  @IsNumber()
  @IsAlreadyExist('voucher', 'id')
  voucherId: number

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  percent: number

  @IsOptional()
  @IsString()
  moneyReduced: string

  @IsOptional()
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => moment(value, 'YYYY-MM-DD HH:mm:ss Z').toISOString())
  startDate: Date

  @IsNotEmpty()
  @IsDateString()
  @checkEndDate()
  @Transform(({ value }: TransformFnParams) => moment(value, 'YYYY-MM-DD HH:mm:ss Z').toISOString())
  endDate: Date

  @IsOptional()
  @IsNumber()
  inventoryNumber: number
}
