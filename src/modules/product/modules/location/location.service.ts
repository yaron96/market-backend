import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { City, CityDocument } from "./schemas/city.schema";
import { Country, CountryDocument } from "./schemas/country.schema";

@Injectable()
export class LocationService {
  constructor (
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
  ) {}

  async findCityByName(query: string) {
    const result = await this.cityModel
      .find({title: { $regex: query, $options: "i"}})
      .limit(10)
      .select('-__v')
      .populate('country', 'title')
    return result;
  }
}