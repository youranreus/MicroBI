import { CalcType } from '@/utils/types';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsString, ValidateNested } from 'class-validator';

export class QueryDataField {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  fieldname: string;
}

export class QueryDataQuota extends QueryDataField {
  @IsEnum(CalcType)
  calc: CalcType;
}

export class QueryDataDto {
  @ValidateNested()
  @Type(() => QueryDataQuota)
  quotas: QueryDataQuota[];

  @ValidateNested()
  @Type(() => QueryDataField)
  dims: QueryDataField[];

  @ValidateNested()
  @Type(() => QueryDataField)
  filters: QueryDataField[];
}
