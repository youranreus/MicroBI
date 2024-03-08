import { IsNotEmpty } from 'class-validator';

export class UpdateDataSetDto {
  @IsNotEmpty()
  name: string;
}
