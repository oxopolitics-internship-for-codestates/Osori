import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class statsGetMapDto {
  @IsNotEmpty()
  @IsMongoId()
  issueId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  mapName: string;
}
