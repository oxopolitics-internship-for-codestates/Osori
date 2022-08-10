import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class statsGetRegionDto {
  @IsNotEmpty()
  @IsMongoId()
  issueId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  regionName: string;
}
