import { CalcType, SortType } from '@/utils/types';
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
  calc?: CalcType;
}

export class QueryDataDim extends QueryDataField {
  @IsEnum(SortType)
  sort?: SortType;
}

export class QueryDataDto {
  @ValidateNested()
  @Type(() => QueryDataQuota)
  quotas: QueryDataQuota[];

  @ValidateNested()
  @Type(() => QueryDataDim)
  dims: QueryDataDim[];

  @ValidateNested()
  @Type(() => QueryDataField)
  filters: QueryDataField[];
}
