import { Injectable } from '@nestjs/common';
import { Time } from 'src/entities/Time';
import { DateDto, TimeDto } from 'src/static/utils/dtos';
import { ServiceService } from '../service/service.service';
import { Stop } from 'src/entities/Stop';
import { Trip } from 'src/entities/Trip';

@Injectable()
export class TimeService {
  constructor(private serviceService: ServiceService) {}

  async getTimesByTripId(agencyId: string, tripId: string) {
    return Time.createQueryBuilder('times')
      .innerJoinAndMapMany(
        'times.stops',
        Stop,
        'stops',
        'times.stop_id = stops.stop_id',
      )
      .where('times.agency_id = :agencyId AND times.trip_id = :tripId', {
        agencyId,
        tripId,
      })
      .select([
        'times.arrival_time',
        'times.departure_time',
        'times.pickup_type',
        'times.drop_off_type',
        'times.stops.stop_id',
        'times.stops.stop_name',
        'times.stops.stop_lat',
        'times.stops.stop_lon',
        'times.stops.stop_shelter',
        'times.stops.wheelchair_boarding',
      ])
      .orderBy('times.stop_sequence', 'ASC')
      .execute();
  }

  async getTodayTimesFromRoute(agencyId: string, routeId: string) {
    return this.getTimesFromRoute(
      agencyId,
      routeId,
      await this.serviceService.getTodayServiceIds(agencyId),
    );
  }

  async getYesterdayTimesFromRoute(agencyId: string, routeId: string) {
    return this.getTimesFromRoute(
      agencyId,
      routeId,
      await this.serviceService.getYesterdayServiceIds(agencyId),
    );
  }

  async getTomorrowTimesFromRoute(agencyId: string, routeId: string) {
    return this.getTimesFromRoute(
      agencyId,
      routeId,
      await this.serviceService.getTomorrowServiceIds(agencyId),
    );
  }

  async getDateTimesFromRoute(
    agencyId: string,
    routeId: string,
    dateDto: DateDto,
  ) {
    return this.getTimesFromRoute(
      agencyId,
      routeId,
      await this.serviceService.getDateServiceIds(agencyId, dateDto),
    );
  }

  async getTodayTimesFromStop(agencyId: string, stopId: string) {
    return this.getTimesFromStop(
      agencyId,
      stopId,
      await this.serviceService.getTodayServiceIds(agencyId),
    );
  }

  async getYesterdayTimesFromStop(agencyId: string, stopId: string) {
    return this.getTimesFromStop(
      agencyId,
      stopId,
      await this.serviceService.getYesterdayServiceIds(agencyId),
    );
  }

  async getTomorrowTimesFromStop(agencyId: string, stopId: string) {
    return this.getTimesFromStop(
      agencyId,
      stopId,
      await this.serviceService.getTomorrowServiceIds(agencyId),
    );
  }

  async getDateTimesFromStop(
    agencyId: string,
    stopId: string,
    dateDto: DateDto,
  ) {
    return this.getTimesFromStop(
      agencyId,
      stopId,
      await this.serviceService.getDateServiceIds(agencyId, dateDto),
    );
  }

  async getTodayTimesFromRouteStop(
    agencyId: string,
    routeId: string,
    stopId: string,
  ) {
    return this.getTimesFromRouteStop(
      agencyId,
      routeId,
      stopId,
      await this.serviceService.getTodayServiceIds(agencyId),
    );
  }

  async getYesterdayTimesFromRouteStop(
    agencyId: string,
    routeId: string,
    stopId: string,
  ) {
    return this.getTimesFromRouteStop(
      agencyId,
      routeId,
      stopId,
      await this.serviceService.getYesterdayServiceIds(agencyId),
    );
  }

  async getTomorrowTimesFromRouteStop(
    agencyId: string,
    routeId: string,
    stopId: string,
  ) {
    return this.getTimesFromRouteStop(
      agencyId,
      routeId,
      stopId,
      await this.serviceService.getTomorrowServiceIds(agencyId),
    );
  }

  async getDateTimesFromRouteStop(
    agencyId: string,
    routeId: string,
    stopId: string,
    dateDto: DateDto,
  ) {
    return this.getTimesFromRouteStop(
      agencyId,
      routeId,
      stopId,
      await this.serviceService.getDateServiceIds(agencyId, dateDto),
    );
  }

  async updateTime(timeDtos: TimeDto[]) {
    const time = Time.create(timeDtos as Time[]);
    return Time.insert(time);
  }

  private async getTimesFromRoute(
    agencyId: string,
    routeId: string,
    serviceIds: string[],
  ) {
    return Time.createQueryBuilder('times')
      .innerJoinAndMapMany(
        'times.stops',
        Stop,
        'stops',
        'times.stop_id = stops.stop_id',
      )
      .innerJoinAndMapMany(
        'times.trips',
        Trip,
        'trips',
        'times.trip_id = trips.trip_id',
      )
      .where(
        'times.agency_id = :agencyId AND times.trips.route_id = :routeId AND times.trips.service_id IN(:serviceIds)',
        {
          agencyId,
          routeId,
          serviceIds,
        },
      )
      .select([
        'times.arrival_time',
        'times.departure_time',
        'times.pickup_type',
        'times.drop_off_type',
        'times.stops.stop_id',
        'times.stops.stop_name',
        'times.stops.stop_lat',
        'times.stops.stop_lon',
        'times.stops.stop_shelter',
        'times.trips.trip_id',
        'times.trips.trip_headsign',
        'times.trips.trip_short_name',
        'times.trips.shape_id',
        'times.trips.wheelchair_accessible',
        'times.trips.bikes_allowed',
      ])
      .orderBy('times.stop_sequence', 'ASC')
      .addOrderBy('times.arrival_time', 'ASC')
      .addOrderBy('times.departure_time', 'ASC')
      .execute();
  }

  private async getTimesFromStop(
    agencyId: string,
    stopId: string,
    serviceIds: string[],
  ) {
    return Time.createQueryBuilder('times')
      .innerJoinAndMapMany(
        'times.trips',
        Trip,
        'trips',
        'times.trip_id = trips.trip_id',
      )
      .where(
        'times.agency_id = :agencyId AND times.stop_id = :stopId \
          AND times.trips.service_id IN(:serviceIds)',
        {
          agencyId,
          stopId,
          serviceIds,
        },
      )
      .select([
        'times.arrival_time',
        'times.departure_time',
        'times.pickup_type',
        'times.drop_off_type',
        'times.trips.trip_id',
        'times.trips.route_id',
        'times.trips.trip_headsign',
        'times.trips.trip_short_name',
        'times.trips.shape_id',
        'times.trips.wheelchair_accessible',
        'times.trips.bikes_allowed',
      ])
      .addOrderBy('times.arrival_time', 'ASC')
      .addOrderBy('times.departure_time', 'ASC')
      .execute();
  }

  private async getTimesFromRouteStop(
    agencyId: string,
    routeId: string,
    stopId: string,
    serviceIds: string[],
  ) {
    return Time.createQueryBuilder('times')
      .innerJoinAndMapMany(
        'times.stops',
        Stop,
        'stops',
        'times.stop_id = stops.stop_id',
      )
      .innerJoinAndMapMany(
        'times.trips',
        Trip,
        'trips',
        'times.trip_id = trips.trip_id',
      )
      .where(
        'times.agency_id = :agencyId AND times.trips.route_id = :routeId \
          AND times.stop_id = :stopId AND times.trips.service_id IN(:serviceIds)',
        {
          agencyId,
          routeId,
          stopId,
          serviceIds,
        },
      )
      .select([
        'times.arrival_time',
        'times.departure_time',
        'times.pickup_type',
        'times.drop_off_type',
        'times.trips.trip_id',
        'times.trips.trip_headsign',
        'times.trips.trip_short_name',
        'times.trips.shape_id',
        'times.trips.wheelchair_accessible',
        'times.trips.bikes_allowed',
      ])
      .orderBy('times.stop_sequence', 'ASC')
      .addOrderBy('times.arrival_time', 'ASC')
      .addOrderBy('times.departure_time', 'ASC')
      .execute();
  }
}
