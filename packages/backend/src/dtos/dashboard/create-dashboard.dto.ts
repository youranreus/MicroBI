import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DashboardChart {
  @IsInt()
  chart: number;

  @IsInt()
  x: number;

  @IsInt()
  y: number;

  @IsInt()
  w: number;

  @IsInt()
  h: number;
}

export class CreateDashboardDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  workspace: number;

  @ValidateNested()
  @Type(() => DashboardChart)
  charts: DashboardChart[];
}
