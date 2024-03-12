import { IsNotEmpty } from 'class-validator';

export class UserDataUpdateDto {
  @IsNotEmpty()
  name: string;

  avatar?: string;
}
