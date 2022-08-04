import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class issueCreateDto {
  @IsNotEmpty()
  issueId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
