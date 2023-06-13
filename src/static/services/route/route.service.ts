import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Route } from 'src/entities/Route';
import { RouteDto } from 'src/static/utils/dtos';
import { ServiceService } from '../service/service.service';
import { Trip } from 'src/entities/Trip';
import { In } from 'typeorm';

@Injectable()
export class RouteService {
  constructor(private serviceService: ServiceService) {}

  async getRoutes(agencyId: string) {
    return Route.find({ where: { agency_id: agencyId } });
  }

  async getRouteById(agencyId: string, routeId: string) {
    return Route.findOne({
      where: { route_id: routeId, agency_id: agencyId },
    });
  }

  async getTripsFromRoute(agencyId: string, routeId: string) {
    return (
      await Route.findOne({
        relations: { trips: true },
        where: { route_id: routeId, agency_id: agencyId },
      })
    ).trips;
  }

  async getTodayTripsFromRoute(agencyId: string, routeId: string) {
    const serviceId = await this.serviceService.getTodayServiceIds(agencyId);
    return await Trip.find({
      where: {
        route_id: routeId,
        agency_id: agencyId,
        service_id: In(serviceId),
      },
    });
  }

  async getYesterdayTripsFromRoute(agencyId: string, routeId: string) {
    const serviceId = await this.serviceService.getYesterdayServiceIds(
      agencyId,
    );
    return await Trip.find({
      where: {
        route_id: routeId,
        agency_id: agencyId,
        service_id: In(serviceId),
      },
    });
  }

  async getTomorrowTripsFromRoute(agencyId: string, routeId: string) {
    const serviceId = await this.serviceService.getTomorrowServiceIds(agencyId);
    return await Trip.find({
      where: {
        route_id: routeId,
        agency_id: agencyId,
        service_id: In(serviceId),
      },
    });
  }

  async updateRoute(agencyId: string, routeDto: RouteDto) {
    const route = Route.create({ ...routeDto });
    route.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    return Route.save(route);
  }
}
