import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class users extends Document {
  @Prop({
    required: true,
    unique: true,
    default: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  _id: number;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

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

  @Prop()
  City_name: string;

  @Prop()
  region_name: string;

  @Prop()
  seq: number;
}

export const userSchema = SchemaFactory.createForClass(users);
