import { Country } from './country.schema';
import mongoose, { Document } from 'mongoose';
export declare type CityDocument = City & Document;
export declare class City {
    title: string;
    country: Country;
}
export declare const CitySchema: mongoose.Schema<City, mongoose.Model<City, any, any, any, any>, {}, {}, any, {}, "type", City>;
