import { IsNotEmpty, IsInt } from 'class-validator';

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
}
