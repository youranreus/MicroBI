import { CalcType, SortType } from '@/utils/types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsEnum, ValidateNested } from 'class-validator';

export class ChartQuota {
  @IsInt()
  id: number;

  @IsEnum(CalcType)
  calc: CalcType;
}

export class ChartDim {
  @IsInt()
  id: number;

  @IsEnum(SortType)
  sort: SortType;
}

export class CreateChartDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsInt()
  workspace: number;

  @IsInt({ each: true })
  quotas: number[];

  @IsInt({ each: true })
  dims: number[];

  @IsInt({ each: true })
  filters: number[];

  @ValidateNested()
  @Type(() => ChartQuota)
  quotaData: ChartQuota[];

  @ValidateNested()
  @Type(() => ChartDim)
  dimData: ChartDim[];
}
