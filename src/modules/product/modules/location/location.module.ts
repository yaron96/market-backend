import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from "./ location.controller";
import { LocationService } from "./location.service";
import { City, CitySchema } from "./schemas/city.schema";
import { Country, CountrySchema } from './schemas/country.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: City.name, schema: CitySchema},
      {name: Country.name, schema: CountrySchema}
    ])
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}