import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/:agencyId/:routeId')
  async getRouteTripsById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.tripService.getTripsFromRoute(agencyId, routeId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/today/:agencyId/:routeId')
  async getRouteTodayTripsById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.tripService.getTodayTripsFromRoute(agencyId, routeId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/yesterday/:agencyId/:routeId')
  async getRouteYesterdayTripsById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.tripService.getYesterdayTripsFromRoute(
        agencyId,
        routeId,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/tomorrow/:agencyId/:routeId')
  async getRouteTomorrowTripsById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.tripService.getTomorrowTripsFromRoute(
        agencyId,
        routeId,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
