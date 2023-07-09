import { Injectable } from '@nestjs/common';
import { Route } from 'src/entities/Route';
import { RouteDto } from 'src/static/utils/dtos';

@Injectable()
export class RouteService {
  async getRoutes(agencyId: string) {
    return Route.find({
      where: { agency_id: agencyId },
      select: {
        agency_id: true,
        route_id: true,
        route_long_name: true,
        route_short_name: true,
        route_type: true,
        route_color: true,
        route_text_color: true,
        night_only: true,
      },
      order: {
        route_sort_order: 'ASC',
        route_short_name: 'ASC',
      },
    });
  }

  async getRouteById(agencyId: string, routeId: string) {
    return Route.findOne({
      where: { route_id: routeId, agency_id: agencyId },
      select: {
        agency_id: true,
        route_id: true,
        route_long_name: true,
        route_short_name: true,
        route_desc: true,
        route_type: true,
        route_url: true,
        route_color: true,
        route_text_color: true,
        route_sort_order: true,
        continuous_pickup: true,
        continuous_drop_off: true,
        night_only: true,
      },
    });
  }

  async updateRoute(agencyId: string, routeDto: RouteDto) {
    const route = Route.create({ ...routeDto, agency_id: agencyId });
    return Route.save(route);
  }
}
