import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { City } from './city.schema';

export type CountryDocument = Country & Document;

@Schema({
  timestamps: true
})
export class Country {
  @Prop()
  title: string;

  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  }])
  cities: City[]
}

export const CountrySchema = SchemaFactory.createForClass(Country);
