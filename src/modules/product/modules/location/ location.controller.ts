import { LocationService } from './location.service';
import { Controller, Get, Param } from "@nestjs/common";

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':query')
  async test(@Param('query') query: string) {
    return this.locationService.findCityByName(query);
  }
}