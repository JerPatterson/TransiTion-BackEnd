import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TripUpdateService } from 'src/realtime/services/trip-update/trip-update.service';

@Controller('trips/update/')
export class TripUpdateController {
  constructor(private tripUpdateService: TripUpdateService) {}

  @Get('/:agencyId/:tripId')
  async getTripUpdateById(
    @Param('agencyId') agencyId: string,
    @Param('tripId') tripId: string,
  ) {
    try {
      return await this.tripUpdateService.getTripUpdateById(agencyId, tripId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/stop/:agencyId/:stopId')
  async getTripUpdatesFromStop(
    @Param('agencyId') agencyId: string,
    @Param('stopId') stopId: string,
  ) {
    try {
      return await this.tripUpdateService.getTripUpdatesFromStop(
        agencyId,
        stopId,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
