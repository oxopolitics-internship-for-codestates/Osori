import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class create_answerdto {
  @IsNumber()
  @IsNotEmpty()
  _id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
