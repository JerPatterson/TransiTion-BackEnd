import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { StopService } from 'src/static/services/stop/stop.service';
import { StopDto } from 'src/static/utils/dtos';

@Controller('stops')
export class StopsController {
  constructor(private stopService: StopService) {}

  @Get('/')
  async getStops() {
    return await this.stopService.getStops();
  }

  @Get('/location/:minLat/:maxLat/:minLon/:maxLon')
  async getStopsFromCoordinates(
    @Param('minLat') minLat: number,
    @Param('minLon') minLon: number,
    @Param('maxLat') maxLat: number,
    @Param('maxLon') maxLon: number,
  ) {
    if (minLat > maxLat || minLon > maxLon) return BadRequestException;
    try {
      return await this.stopService.getStopsFromCoordinates(
        minLat,
        maxLat,
        minLon,
        maxLon,
      );
    } catch {
      return NotFoundException;
    }
  }

  @Get('/:agencyId')
  async getStopsFromAgency(@Param('agencyId') agencyId: string) {
    try {
      return await this.stopService.getStopsFromAgency(agencyId);
    } catch {
      return NotFoundException;
    }
  }

  @Get('/:agencyId/:stopId')
  async getStopFromAgencyById(
    @Param('agencyId') agencyId: string,
    @Param('stopId') stopId: string,
  ) {
    try {
      return await this.stopService.getStopFromAgencyById(agencyId, stopId);
    } catch {
      return NotFoundException;
    }
  }

  @Post('/:agencyId')
  async createStop(@Param('agencyId') agencyId: string, @Body() stop: StopDto) {
    try {
      return await this.stopService.createStop(agencyId, stop);
    } catch {
      return BadRequestException;
    }
  }
}
