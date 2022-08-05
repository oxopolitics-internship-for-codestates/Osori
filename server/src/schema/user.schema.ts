import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Answer } from './answer.schema';
import { Issue } from './issue.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  userName: string;

  @Prop({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  age: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }] })
  issues: Issue[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }] })
  answers: Answer[];
}

export const user_Schema = SchemaFactory.createForClass(User);
