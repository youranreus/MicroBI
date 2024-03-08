import { IsInt, IsNotEmpty, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { FieldType } from '@/utils/types';
import { PartialType } from '@nestjs/mapped-types';

export class DatasetFieldCreateDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(FieldType)
  type: FieldType;

  @IsNotEmpty()
  fieldname: string;
}

export class DatasetFieldUpdateDto extends PartialType(DatasetFieldCreateDto) {}

export class CreateDataSetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tablename: string;

  @IsInt()
  datasource: number;

  @ValidateNested()
  @Type(() => DatasetFieldCreateDto)
  fields: DatasetFieldCreateDto[];
}
