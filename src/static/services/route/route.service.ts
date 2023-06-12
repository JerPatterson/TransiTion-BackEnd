import { Injectable } from '@nestjs/common';
import { Route } from 'src/entities/Route';
import { RouteDto } from 'src/static/utils/dtos';

@Injectable()
export class RouteService {
  async getRoutes() {
    return Route.find({
      select: {
        agency_id: true,
        route_id: true,
        route_long_name: true,
      },
    });
  }

  async getRoutesFromAgency(agencyId: string) {
    return Route.find({ where: { agency_id: agencyId } });
  }

  async getRouteFromAgencyById(agencyId: string, routeId: string) {
    return Route.findOne({
      where: { route_id: routeId, agency_id: agencyId },
    });
  }

  async updateRoute(agencyId: string, routeDto: RouteDto) {
    const stop = Route.create({ ...routeDto, agency_id: agencyId });
    return Route.save(stop);
  }
}
