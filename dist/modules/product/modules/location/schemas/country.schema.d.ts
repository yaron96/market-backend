import mongoose, { Document } from 'mongoose';
import { City } from './city.schema';
export declare type CountryDocument = Country & Document;
export declare class Country {
    title: string;
    cities: City[];
}
export declare const CountrySchema: mongoose.Schema<Country, mongoose.Model<Country, any, any, any, any>, {}, {}, any, {}, "type", Country>;
