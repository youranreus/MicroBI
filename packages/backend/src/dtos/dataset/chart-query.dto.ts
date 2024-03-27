import { IsInt } from 'class-validator';

export class QueryDataDto {
  @IsInt({ each: true })
  quotas: number[];

  @IsInt({ each: true })
  dims: number[];

  @IsInt({ each: true })
  filters: number[];
}
