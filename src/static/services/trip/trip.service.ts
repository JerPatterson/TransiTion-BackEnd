import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Route } from 'src/entities/Route';
import { Trip } from 'src/entities/Trip';
import { TripDto } from 'src/static/utils/dtos';
import { ServiceService } from 'src/static/services/service/service.service';
import { In } from 'typeorm';
import { Time } from 'src/entities/Time';

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
      select: {
        route_id: true,
        service_id: true,
        trip_id: true,
        trip_headsign: true,
        trip_short_name: true,
        direction_id: true,
        block_id: true,
        shape_id: true,
        wheelchair_accessible: true,
        bikes_allowed: true,
      },
    });
  }

  async getTripsFromRoute(agencyId: string, routeId: string) {
    return await Trip.find({
      where: {
        route_id: routeId,
        agency_id: agencyId,
      },
      select: {
        trip_id: true,
        route_id: true,
        trip_headsign: true,
        trip_short_name: true,
        wheelchair_accessible: true,
        bikes_allowed: true,
      },
    });
  }

  async getTodayTripsFromRoute(agencyId: string, routeId: string) {
    return this.getRouteTripsFromServiceIds(
      agencyId,
      routeId,
      await this.serviceService.getTodayServiceIds(agencyId),
    );
  }

  async getYesterdayTripsFromRoute(agencyId: string, routeId: string) {
    return this.getRouteTripsFromServiceIds(
      agencyId,
      routeId,
      await this.serviceService.getYesterdayServiceIds(agencyId),
    );
  }

  async getTomorrowTripsFromRoute(agencyId: string, routeId: string) {
    return this.getRouteTripsFromServiceIds(
      agencyId,
      routeId,
      await this.serviceService.getTomorrowServiceIds(agencyId),
    );
  }

  async getTripIdsFromStop(agencyId: string, stopId: string) {
    return (
      await Time.find({
        relations: { trip: true },
        where: { agency_id: agencyId, stop: { stop_id: stopId } },
        select: {
          trip: {
            trip_id: true,
            route_id: true,
            trip_headsign: true,
            trip_short_name: true,
            wheelchair_accessible: true,
            bikes_allowed: true,
          },
        },
      })
    ).map((time) => time.trip);
  }

  async getTodayTripIdsFromStop(agencyId: string, stopId: string) {
    return this.getStopTripsFromServiceIds(
      agencyId,
      stopId,
      await this.serviceService.getTodayServiceIds(agencyId),
    );
  }

  async getYesterdayTripIdsFromStop(agencyId: string, stopId: string) {
    return this.getStopTripsFromServiceIds(
      agencyId,
      stopId,
      await this.serviceService.getYesterdayServiceIds(agencyId),
    );
  }

  async getTomorrowTripIdsFromStop(agencyId: string, stopId: string) {
    return this.getStopTripsFromServiceIds(
      agencyId,
      stopId,
      await this.serviceService.getTomorrowServiceIds(agencyId),
    );
  }

  async updateTrip(agencyId: string, tripDto: TripDto) {
    const trip = Trip.create({ ...tripDto, agency: { agency_id: agencyId } });
    trip.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    trip.route = await Route.findOne({
      where: { route_id: tripDto.route_id, agency: { agency_id: agencyId } },
    });
    return Trip.save(trip);
  }

  private async getRouteTripsFromServiceIds(
    agencyId: string,
    routeId: string,
    serviceIds: string[],
  ) {
    return await Trip.find({
      where: {
        route_id: routeId,
        agency_id: agencyId,
        service_id: In(serviceIds),
      },
      select: {
        trip_id: true,
        route_id: true,
        trip_headsign: true,
        trip_short_name: true,
        wheelchair_accessible: true,
        bikes_allowed: true,
      },
    });
  }

  private async getStopTripsFromServiceIds(
    agencyId: string,
    stopId: string,
    serviceIds: string[],
  ) {
    return (
      await Time.find({
        relations: { trip: true },
        where: {
          agency_id: agencyId,
          stop: { stop_id: stopId },
          trip: { service_id: In(serviceIds) },
        },
        select: {
          trip: {
            trip_id: true,
            route_id: true,
            trip_headsign: true,
            trip_short_name: true,
            wheelchair_accessible: true,
            bikes_allowed: true,
          },
        },
      })
    ).map((time) => time.trip);
  }
}
