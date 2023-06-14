import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Route } from 'src/entities/Route';
import { RouteDto } from 'src/static/utils/dtos';

@Injectable()
export class RouteService {
  async getRoutes(agencyId: string) {
    return Route.find({ where: { agency_id: agencyId } });
  }

  async getRouteById(agencyId: string, routeId: string) {
    return Route.findOne({
      where: { route_id: routeId, agency_id: agencyId },
    });
  }

  async updateRoute(agencyId: string, routeDto: RouteDto) {
    const route = Route.create({ ...routeDto });
    route.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    return Route.save(route);
  }
}
