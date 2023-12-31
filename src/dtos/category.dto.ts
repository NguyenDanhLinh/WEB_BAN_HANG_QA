import { isValidEmail } from '@decorators/is.email.decorator'
import { IsAlreadyExist } from '@decorators/is.exist.decorator'
import { isValidPhoneNumber } from '@decorators/is.phoneNumber.decorator'
import { IsNotExist } from '@decorators/isNot.exist.decorator'
import { File } from '@interfaces/file.interface'
import { IsNotEmpty, IsNumber, IsEnum, IsString, IsOptional } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsNotExist('categories', 'name')
  name: string

  @IsNotEmpty()
  @IsString()
  img: string
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @IsAlreadyExist('categories', 'id')
  id: number

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  img: string
}

export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsAlreadyExist('categories', 'id')
  id: number
}
