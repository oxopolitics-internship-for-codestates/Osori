import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class users extends Document {
  @Prop()
  @IsString()
  name: string;

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
  address: [string];

  @Prop()
  @IsNumber()
  card_answer_id: [number];
}

export const userSchema = SchemaFactory.createForClass(users);
