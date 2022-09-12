import { Country } from './country.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({
  timestamps: true
})
export class City {
  @Prop()
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  })
  country: Country
}

export const CitySchema = SchemaFactory.createForClass(City);
