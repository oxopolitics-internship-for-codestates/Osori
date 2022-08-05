import { IsNotEmpty, IsString } from 'class-validator';

export class issueCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  answerTextO: string;

  @IsNotEmpty()
  @IsString()
  answerTextX: string;

  @IsNotEmpty()
  @IsString()
  answerTextS: string;
}
