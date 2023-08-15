import { isValidEmail } from '@decorators/is.email.decorator'
import { IsAlreadyExist } from '@decorators/is.exist.decorator'
import { isValidPhoneNumber } from '@decorators/is.phoneNumber.decorator'
import { IsNotExist } from '@decorators/isNot.exist.decorator'
import { IsNotEmpty, IsNumber, IsEnum, IsString, IsOptional } from 'class-validator'
import { Transform, Type, TransformFnParams } from 'class-transformer'

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  inputPrice: string

  @IsNotEmpty()
  @IsString()
  outputPrice: string

  @IsNotEmpty()
  @IsString()
  weight: string

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  inventoryNumber: number

  @IsNotEmpty()
  @IsNumber()
  @IsAlreadyExist('categories', 'id')
  categoryId: number

  @IsNotEmpty()
  @IsString()
  imgDetail: string

  @IsNotEmpty()
  @IsString()
  avatar: string
}

export class UpdateItemDto {
  @IsNotEmpty()
  @IsNumber()
  @IsAlreadyExist('items', 'id')
  id: number

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  outputPrice: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  inventoryNumber: number

  @IsOptional()
  @IsString()
  imgDetail: string

  @IsOptional()
  @IsString()
  avatar: string
}

export class DeleteItemDto {
  @IsNotEmpty()
  @IsNumber()
  @IsAlreadyExist('items', 'id')
  @IsNotExist('order_item', 'itemId')
  @Type(() => Number)
  itemId: number
}
