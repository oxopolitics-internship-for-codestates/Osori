import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class counter extends Document {
  @Prop({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  seq: number;
}

export const counterSchema = SchemaFactory.createForClass(counter);
