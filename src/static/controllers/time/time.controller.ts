import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
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
      return NotFoundException;
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
      return BadRequestException;
    }
  }
}
