import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { StopService } from 'src/static/services/stop/stop.service';
import { AreaDto, StopDto } from 'src/static/utils/dtos';

@Controller('stops')
export class StopsController {
  constructor(private stopService: StopService) {}

  @Get('/:agencyId')
  async getStops(@Param('agencyId') agencyId: string) {
    try {
      return await this.stopService.getStops(agencyId);
    } catch {
      return NotFoundException;
    }
  }

  @Get('/location')
  async getStopsFromArea(@Body() area: AreaDto) {
    if (area.minLat > area.maxLat || area.minLon > area.maxLon)
      return BadRequestException;
    try {
      return await this.stopService.getStopsFromArea(area);
    } catch {
      return NotFoundException;
    }
  }

  @Get('/:agencyId/:stopId')
  async getStopById(
    @Param('agencyId') agencyId: string,
    @Param('stopId') stopId: string,
  ) {
    try {
      return await this.stopService.getStopById(agencyId, stopId);
    } catch {
      return NotFoundException;
    }
  }

  @Put('/:agencyId')
  async updateStop(@Param('agencyId') agencyId: string, @Body() stop: StopDto) {
    try {
      return await this.stopService.updateStop(agencyId, stop);
    } catch {
      return BadRequestException;
    }
  }
}
