import { City } from '../modules/location/schemas/city.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Image } from 'modules/image/schemas/image.schema';
import { User } from 'modules/user/schemas/user.schema';
import { ProductCategory } from '../modules/category/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  author: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
  })
  category: ProductCategory;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  })
  location: City;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      default: [],
    },
  ])
  images: Image[];

  @Prop()
  length: number;

  @Prop()
  beam: number;

  @Prop()
  built: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
