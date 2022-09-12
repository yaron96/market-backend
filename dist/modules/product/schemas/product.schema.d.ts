import { City } from '../modules/location/schemas/city.schema';
import mongoose, { Document } from 'mongoose';
import { Image } from 'modules/image/schemas/image.schema';
import { User } from 'modules/user/schemas/user.schema';
import { ProductCategory } from '../modules/category/schemas/category.schema';
export declare type ProductDocument = Product & Document;
export declare class Product {
    title: string;
    author: User;
    category: ProductCategory;
    location: City;
    price: number;
    description: string;
    images: Image[];
    length: number;
    beam: number;
    built: number;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, any, {}, "type", Product>;
