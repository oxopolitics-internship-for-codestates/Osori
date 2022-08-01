import { IsEmail, IsNotEmpty } from 'class-validator';

export class usersInforDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
