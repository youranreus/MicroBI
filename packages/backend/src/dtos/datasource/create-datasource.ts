import { IsInt, IsNotEmpty } from 'class-validator';
import { ConnectTestDto } from './connect-test';

export class CreateDatasourceDto extends ConnectTestDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  workspace: number;
}
