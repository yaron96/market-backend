import mongoose, { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'modules/user/schemas/user.schema';

export type SessionDocument = Session & Document

@Schema({
  timestamps: true
})
export class Session {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User

  @Prop({
    required: true
  })
  refreshToken: string
}

export const SessionSchema = SchemaFactory.createForClass(Session)