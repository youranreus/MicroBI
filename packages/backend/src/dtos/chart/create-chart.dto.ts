import { IsNotEmpty, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ChartFieldDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  id: number;
}

export class CreateChartDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @ValidateNested()
  @Type(() => ChartFieldDto)
  quotas: ChartFieldDto[];

  @ValidateNested()
  @Type(() => ChartFieldDto)
  dims: ChartFieldDto[];

  @ValidateNested()
  @Type(() => ChartFieldDto)
  filters: ChartFieldDto[];
}
