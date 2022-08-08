import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

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

  @IsNotEmpty()
  @IsMongoId()
  userId: mongoose.Schema.Types.ObjectId;
}
