import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Answer } from './answer.schema';
import { User } from './user.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Issue extends Document {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  answerTextO: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  answerTextX: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  answerTextS: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }] })
  answers: Answer[];
}

export const issue_Schema = SchemaFactory.createForClass(Issue);
