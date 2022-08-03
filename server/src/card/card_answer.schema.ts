import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class cardanswer extends Document {
  @Prop({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  _id: number;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  answer: string;
}

export const card_answer_Schema = SchemaFactory.createForClass(cardanswer);
