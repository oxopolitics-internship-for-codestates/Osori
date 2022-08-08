import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class issueAnswerDto {
  @IsNotEmpty()
  @IsMongoId()
  issueId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
