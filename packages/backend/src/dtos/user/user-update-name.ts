import { IsNotEmpty } from 'class-validator';

export class UserNameUpdateDto {
  @IsNotEmpty()
  name: string;
}
