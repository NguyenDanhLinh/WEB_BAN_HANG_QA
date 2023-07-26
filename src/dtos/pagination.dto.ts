import { Type } from 'class-transformer'
import { IsNumber, IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator'

export class PaginationQueryDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skip: number

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number

  @IsString()
  @IsOptional()
  sort: string

  @IsString()
  @IsOptional()
  search: string
}
