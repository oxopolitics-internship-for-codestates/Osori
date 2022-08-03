import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Issue } from './issue.schema';
import { User } from './user.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Answer extends Document {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  answer: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' })
  issue: Issue;
}

export const answer_Schema = SchemaFactory.createForClass(Answer);
