import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Route } from 'src/entities/Route';
import { Trip } from 'src/entities/Trip';
import { TripDto } from 'src/static/utils/dtos';
import { ServiceService } from 'src/static/services/service/service.service';
import { In } from 'typeorm';

@Injectable()
export class TripService {
  constructor(private serviceService: ServiceService) {}

  async getTrips(agencyId: string) {
    return Trip.find({
      where: { agency_id: agencyId },
      select: {
        route_id: true,
        trip_id: true,
        service_id: true,
      },
    });
  }

  async getTripById(agencyId: string, tripId: string) {
    return Trip.findOne({
      where: { trip_id: tripId, agency: { agency_id: agencyId } },
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

  async updateTrip(agencyId: string, tripDto: TripDto) {
    const trip = Trip.create({ ...tripDto, agency: { agency_id: agencyId } });
    trip.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    trip.route = await Route.findOne({
      where: { route_id: tripDto.route_id, agency: { agency_id: agencyId } },
    });
    return Trip.save(trip);
  }
}
