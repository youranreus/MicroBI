import { IsNotEmpty } from 'class-validator';
import { ConnectTestDto } from './connect-test';

export class UpdateDatasourceDto extends ConnectTestDto {
  @IsNotEmpty()
  name: string;
}
