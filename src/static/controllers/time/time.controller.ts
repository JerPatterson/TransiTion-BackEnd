import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { TimeService } from 'src/static/services/time/time.service';
import { TimeDto } from 'src/static/utils/dtos';

@Controller('times')
export class TimeController {
  constructor(private timeService: TimeService) {}

  @Get('/:agencyId/:tripId')
  async getStopFromAgencyById(
    @Param('agencyId') agencyId: string,
    @Param('tripId') tripId: string,
  ) {
    try {
      return await this.timeService.getTimesByTripId(agencyId, tripId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/today/:agencyId/:routeId')
  async getRouteTodayTimesById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.timeService.getTodayTimesFromRoute(agencyId, routeId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/yesterday/:agencyId/:routeId')
  async getRouteYesterdayTimesById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.timeService.getYesterdayTimesFromRoute(
        agencyId,
        routeId,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/route/tomorrow/:agencyId/:routeId')
  async getRouteTomorrowTimesById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.timeService.getTomorrowTimesFromRoute(
        agencyId,
        routeId,
      );
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:agencyId')
  async updateStop(
    @Param('agencyId') agencyId: string,
    @Body() times: TimeDto[],
  ) {
    try {
      times.forEach(async (time) => {
        if (!time.trip_id) console.log(time);
        await this.timeService.updateTime(agencyId, time);
      });
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
