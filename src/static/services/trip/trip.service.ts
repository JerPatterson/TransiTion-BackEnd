import { Injectable } from '@nestjs/common';
import { Trip } from 'src/entities/Trip';
import { DateDto, TripDto } from 'src/static/utils/dtos';
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
      where: { trip_id: tripId, agency_id: agencyId },
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
      where: { route_id: routeId, agency_id: agencyId },
      select: {
        trip_id: true,
        route_id: true,
        trip_headsign: true,
        trip_short_name: true,
        shape_id: true,
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

  async getDateTripsFromRoute(
    agencyId: string,
    routeId: string,
    dateDto: DateDto,
  ) {
    return this.getRouteTripsFromServiceIds(
      agencyId,
      routeId,
      await this.serviceService.getDateServiceIds(agencyId, dateDto),
    );
  }

  async getTripsFromStop(agencyId: string, stopId: string) {
    return Trip.createQueryBuilder('trips')
      .innerJoinAndMapMany(
        'trips.times',
        Time,
        'times',
        'trips.trip_id = times.trip_id',
      )
      .where('trips.agency_id = :agencyId AND trips.times.stop_id = :stopId', {
        agencyId,
        stopId,
      })
      .select([
        'trips.trip_id',
        'trips.route_id',
        'trips.trip_headsign',
        'trips.trip_short_name',
        'trips.shape_id',
        'trips.wheelchair_accessible',
        'trips.bikes_allowed',
      ])
      .execute();
  }

  async getTodayTripsFromStop(agencyId: string, stopId: string) {
    return this.getStopTripsFromServiceIds(
      agencyId,
      stopId,
      await this.serviceService.getTodayServiceIds(agencyId),
    );
  }

  async getYesterdayTripsFromStop(agencyId: string, stopId: string) {
    return this.getStopTripsFromServiceIds(
      agencyId,
      stopId,
      await this.serviceService.getYesterdayServiceIds(agencyId),
    );
  }

  async getTomorrowTripsFromStop(agencyId: string, stopId: string) {
    return this.getStopTripsFromServiceIds(
      agencyId,
      stopId,
      await this.serviceService.getTomorrowServiceIds(agencyId),
    );
  }

  async getDateTripsFromStop(
    agencyId: string,
    stopId: string,
    dateDto: DateDto,
  ) {
    return this.getStopTripsFromServiceIds(
      agencyId,
      stopId,
      await this.serviceService.getDateServiceIds(agencyId, dateDto),
    );
  }

  async updateTrip(tripDtos: TripDto[]) {
    const trip = Trip.create(tripDtos as Trip[]);
    return Trip.insert(trip);
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
        shape_id: true,
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
    return Trip.createQueryBuilder('trips')
      .innerJoinAndMapMany(
        'trips.times',
        Time,
        'times',
        'trips.trip_id = times.trip_id',
      )
      .where(
        'trips.agency_id = :agencyId AND trips.times.stop_id = :stopId \
          AND times.trips.service_id IN(:serviceIds)',
        {
          agencyId,
          stopId,
          serviceIds,
        },
      )
      .select([
        'trips.trip_id',
        'trips.route_id',
        'trips.trip_headsign',
        'trips.trip_short_name',
        'trips.shape_id',
        'trips.wheelchair_accessible',
        'trips.bikes_allowed',
      ])
      .execute();
  }
}
