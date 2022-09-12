import { Product } from './../../../schemas/product.schema';
import mongoose, { Document } from 'mongoose';
export declare type ProductCategoryDocument = ProductCategory & Document;
export declare class ProductCategory {
    title: String;
    children: [];
    products: Product[];
}
export declare const ProductCategorySchema: mongoose.Schema<ProductCategory, mongoose.Model<ProductCategory, any, any, any, any>, {}, {}, any, {}, "type", ProductCategory>;
