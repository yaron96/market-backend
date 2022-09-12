import mongoose, { Document } from 'mongoose';
export declare type ImageDocument = Image & Document;
export declare class Image {
    owners: mongoose.Schema.Types.ObjectId[];
}
export declare const ImageSchema: mongoose.Schema<Image, mongoose.Model<Image, any, any, any, any>, {}, {}, any, {}, "type", Image>;
