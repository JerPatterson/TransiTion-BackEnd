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
      return await this.timeService.getTimesFromAgencyByTripId(
        agencyId,
        tripId,
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
        await this.timeService.updateTime(agencyId, time);
      });
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
