import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { TripService } from 'src/static/services/trip/trip.service';
import { TripDto } from 'src/static/utils/dtos';

@Controller('trips')
export class TripController {
  constructor(private tripService: TripService) {}

  @Get('/:agencyId')
  async getTrips(@Param('agencyId') agencyId: string) {
    try {
      return await this.tripService.getTrips(agencyId);
    } catch {
      return NotFoundException;
    }
  }

  @Get('/:agencyId/:tripId')
  async getTripById(
    @Param('agencyId') agencyId: string,
    @Param('tripId') tripId: string,
  ) {
    try {
      return await this.tripService.getTripById(agencyId, tripId);
    } catch {
      return NotFoundException;
    }
  }

  @Put('/:agencyId')
  async updateTrip(
    @Param('agencyId') agencyId: string,
    @Body() trips: TripDto[],
  ) {
    try {
      trips.forEach(async (trip) => {
        await this.tripService.updateTrip(agencyId, trip);
      });
    } catch {
      return BadRequestException;
    }
  }
}
