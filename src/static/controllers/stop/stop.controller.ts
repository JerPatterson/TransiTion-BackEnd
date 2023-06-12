import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StopService } from 'src/static/services/stop/stop.service';
import { StopDto } from 'src/static/utils/dtos';

@Controller('stops')
export class StopsController {
  constructor(private stopService: StopService) {}

  @Get('/')
  async getStops() {
    return await this.stopService.getStops();
  }

  @Get('/:agencyId')
  async getStopsFromAgency(@Param('agencyId') agencyId: string) {
    return await this.stopService.getStopsFromAgency(agencyId);
  }

  @Get('/:agencyId/:stopId')
  async getStopFromAgencyById(
    @Param('agencyId') agencyId: string,
    @Param('stopId') stopId: string,
  ) {
    return await this.stopService.getStopFromAgencyById(agencyId, stopId);
  }

  @Post('/:agencyId')
  async createStop(@Param('agencyId') agencyId: string, @Body() stop: StopDto) {
    return await this.stopService.createStop(agencyId, stop);
  }
}
