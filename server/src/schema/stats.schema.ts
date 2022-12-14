import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsMongoId, IsNumber, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Stats extends Document {
  @Prop({
    required: true,
  })
  @IsMongoId()
  issueId: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    default: '',
  })
  @IsString()
  mapName: string;

  @Prop({
    required: true,
    default: '',
  })
  @IsString()
  regionName: string;

  @Prop({
    required: true,
    default: 0,
  })
  @IsNumber()
  count: number;

  @Prop({
    _id: false,
    required: true,
    type: {
      count: Number,
      yes: Number,
      no: Number,
      so: Number,
      age: {
        '10대': Number,
        '20대': Number,
        '30대': Number,
        '40대': Number,
        '50대': Number,
        '60대이상': Number,
      },
    },
    default: {
      count: 0,
      yes: 0,
      no: 0,
      so: 0,
      age: {
        '10대': 0,
        '20대': 0,
        '30대': 0,
        '40대': 0,
        '50대': 0,
        '60대이상': 0,
      },
    },
  })
  male: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };

  @Prop({
    _id: false,
    required: true,
    type: {
      count: Number,
      yes: Number,
      no: Number,
      so: Number,
      age: {
        '10대': Number,
        '20대': Number,
        '30대': Number,
        '40대': Number,
        '50대': Number,
        '60대이상': Number,
      },
    },
    default: {
      count: 0,
      yes: 0,
      no: 0,
      so: 0,
      age: {
        '10대': 0,
        '20대': 0,
        '30대': 0,
        '40대': 0,
        '50대': 0,
        '60대이상': 0,
      },
    },
  })
  female: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };
}

export const stats_Schema = SchemaFactory.createForClass(Stats);
