import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { RouteService } from 'src/static/services/route/route.service';
import { RouteDto } from 'src/static/utils/dtos';

@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService) {}

  @Get('/')
  async getRoutes() {
    return await this.routeService.getRoutes();
  }

  @Get('/:agencyId')
  async getRoutesFromAgency(@Param('agencyId') agencyId: string) {
    try {
      return await this.routeService.getRoutesFromAgency(agencyId);
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
      return await this.routeService.getRouteFromAgencyById(agencyId, routeId);
    } catch {
      return NotFoundException;
    }
  }

  @Put('/:agencyId')
  async updateStop(
    @Param('agencyId') agencyId: string,
    @Body() stop: RouteDto,
  ) {
    try {
      return await this.routeService.updateRoute(agencyId, stop);
    } catch {
      return BadRequestException;
    }
  }
}
