import mongoose, { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ImageDocument = Image & Document

@Schema()
export class Image {
  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }])
  owners: mongoose.Schema.Types.ObjectId[]
}

export const ImageSchema = SchemaFactory.createForClass(Image)