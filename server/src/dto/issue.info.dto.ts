import { IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class issueInfoDto {
  @IsMongoId()
  userId: mongoose.Schema.Types.ObjectId;
}
