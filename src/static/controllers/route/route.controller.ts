import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { RouteService } from 'src/static/services/route/route.service';
import { RouteDto } from 'src/static/utils/dtos';

@Controller('routes')
export class RouteController {
  constructor(private routeService: RouteService) {}

  @Get('/:agencyId')
  async getRoutes(@Param('agencyId') agencyId: string) {
    try {
      return await this.routeService.getRoutes(agencyId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:agencyId/:routeId')
  async getRouteById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.routeService.getRouteById(agencyId, routeId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/trips/:agencyId/:routeId')
  async getRouteTripsFromAgencyById(
    @Param('agencyId') agencyId: string,
    @Param('routeId') routeId: string,
  ) {
    try {
      return await this.routeService.getTripsFromRoute(agencyId, routeId);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:agencyId')
  async updateRoute(
    @Param('agencyId') agencyId: string,
    @Body() route: RouteDto,
  ) {
    try {
      return await this.routeService.updateRoute(agencyId, route);
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
