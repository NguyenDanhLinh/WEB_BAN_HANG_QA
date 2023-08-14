import { isValidEmail } from '@decorators/is.email.decorator'
import { IsAlreadyExist } from '@decorators/is.exist.decorator'
import { isValidPhoneNumber } from '@decorators/is.phoneNumber.decorator'
import { IsNotExist } from '@decorators/isNot.exist.decorator'
import { IsNotEmpty, IsNumber, IsEnum, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsNotExist('users', 'user_name')
  userName: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  @IsNotExist('users', 'phone_number')
  @isValidPhoneNumber()
  phoneNumber: string

  @IsNotEmpty()
  @IsString()
  address: string

  @IsNotEmpty()
  @IsString()
  @IsNotExist('users', 'email')
  @isValidEmail()
  email: string
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  userName: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class ReceiveVoucherDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsAlreadyExist('voucher', 'id')
  voucherId: number
}

export class VerifyEmailDto {
  @IsNotEmpty()
  @IsString()
  token: string
}
