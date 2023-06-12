import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/location')
  async getStopsFromArea(@Body() area: AreaDto) {
    if (area.minLat > area.maxLat || area.minLon > area.maxLon)
      return BadRequestException;
    try {
      return await this.stopService.getStopsFromArea(area);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:agencyId')
  async updateStop(
    @Param('agencyId') agencyId: string,
    @Body() stops: StopDto[],
  ) {
    try {
      stops.forEach(async (stop) => {
        await this.stopService.updateStop(agencyId, stop);
      });
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
