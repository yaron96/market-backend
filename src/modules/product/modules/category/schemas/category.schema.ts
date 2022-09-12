import { Product } from './../../../schemas/product.schema';
import mongoose, { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductCategoryDocument = ProductCategory & Document

@Schema()
export class ProductCategory {
  @Prop({
    type: String,
    required: true,
  })
  title: String

  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory"
  }])
  children: []

  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name
  }])
  products: Product[]
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory)