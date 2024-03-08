import { IsInt, IsNotEmpty, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { FieldType } from '@/utils/types';

class DatasetFieldCreateItem {
  @IsNotEmpty()
  name: string;

  @IsEnum(FieldType)
  type: FieldType;

  @IsNotEmpty()
  fieldname: string;
}

export class CreateDataSetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tablename: string;

  @IsInt()
  datasource: number;

  @ValidateNested()
  @Type(() => DatasetFieldCreateItem)
  fields: DatasetFieldCreateItem[];
}
