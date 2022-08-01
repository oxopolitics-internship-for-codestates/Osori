import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class usersRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  answer: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
