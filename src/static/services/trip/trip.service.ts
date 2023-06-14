import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
import { Route } from 'src/entities/Route';
import { Trip } from 'src/entities/Trip';
import { TripDto } from 'src/static/utils/dtos';
import { ServiceService } from 'src/static/services/service/service.service';
import { In } from 'typeorm';
import { Stop } from 'src/entities/Stop';
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
    });
  }

  async getTripIdsFromRoute(agencyId: string, routeId: string) {
    return (
      await Route.findOne({
        relations: { trips: true },
        where: { route_id: routeId, agency_id: agencyId },
      })
    ).trips.map((trip) => trip.trip_id);
  }

  async getTodayTripIdsFromRoute(agencyId: string, routeId: string) {
    const serviceId = await this.serviceService.getTodayServiceIds(agencyId);
    return (
      await Trip.find({
        where: {
          route_id: routeId,
          agency_id: agencyId,
          service_id: In(serviceId),
        },
        select: { trip_id: true },
      })
    ).map((trip) => trip.trip_id);
  }

  async getYesterdayTripIdsFromRoute(agencyId: string, routeId: string) {
    const serviceId = await this.serviceService.getYesterdayServiceIds(
      agencyId,
    );
    return (
      await Trip.find({
        where: {
          route_id: routeId,
          agency_id: agencyId,
          service_id: In(serviceId),
        },
        select: { trip_id: true },
      })
    ).map((trip) => trip.trip_id);
  }

  async getTomorrowTripIdsFromRoute(agencyId: string, routeId: string) {
    const serviceId = await this.serviceService.getTomorrowServiceIds(agencyId);
    return (
      await Trip.find({
        where: {
          route_id: routeId,
          agency_id: agencyId,
          service_id: In(serviceId),
        },
        select: { trip_id: true },
      })
    ).map((trip) => trip.trip_id);
  }

  async getTripIdsFromStop(agencyId: string, stopId: string) {
    return (
      await Stop.findOne({
        relations: { times: true },
        where: { stop_id: stopId, agency_id: agencyId },
      })
    ).times.map((time) => time.trip_id);
  }

  async getTodayTripIdsFromStop(agencyId: string, stopId: string) {
    const serviceId = await this.serviceService.getTodayServiceIds(agencyId);
    return (
      await Time.find({
        where: {
          agency_id: agencyId,
          stop_id: stopId,
          trip: { service_id: In(serviceId) },
        },
        select: { trip_id: true },
      })
    ).map((time) => time.trip_id);
  }

  async getYesterdayTripIdsFromStop(agencyId: string, stopId: string) {
    const serviceId = await this.serviceService.getYesterdayServiceIds(
      agencyId,
    );
    return (
      await Time.find({
        where: {
          agency_id: agencyId,
          stop_id: stopId,
          trip: { service_id: In(serviceId) },
        },
        select: { trip_id: true },
      })
    ).map((time) => time.trip_id);
  }

  async getTomorrowTripIdsFromStop(agencyId: string, stopId: string) {
    const serviceId = await this.serviceService.getTomorrowServiceIds(agencyId);
    return (
      await Time.find({
        where: {
          agency_id: agencyId,
          stop_id: stopId,
          trip: { service_id: In(serviceId) },
        },
        select: { trip_id: true },
      })
    ).map((time) => time.trip_id);
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
