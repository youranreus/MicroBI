import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { DataSourceType } from '@/utils/types';

export class ConnectTestDto {
  @IsNotEmpty()
  ip: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(DataSourceType)
  type: DataSourceType;

  @IsInt()
  port: number;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  database: string;
}
