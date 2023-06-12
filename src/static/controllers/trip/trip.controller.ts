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
  async getTripsFromAgency(@Param('agencyId') agencyId: string) {
    try {
      return await this.tripService.getTripsFromAgency(agencyId);
    } catch {
      return NotFoundException;
    }
  }

  @Get('/:agencyId/:routeId')
  async getStopFromAgencyById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.tripService.getTripFromAgencyById(agencyId, routeId);
    } catch {
      return NotFoundException;
    }
  }

  @Put('/:agencyId')
  async updateStop(@Param('agencyId') agencyId: string, @Body() trip: TripDto) {
    try {
      return await this.tripService.updateTrip(agencyId, trip);
    } catch {
      return BadRequestException;
    }
  }
}
