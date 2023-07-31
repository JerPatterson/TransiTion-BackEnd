import { Injectable } from '@nestjs/common';
import { Stop } from 'src/entities/Stop';
import { Time } from 'src/entities/Time';
import { Trip } from 'src/entities/Trip';
import { AreaDto, StopDto } from 'src/static/utils/dtos';
import { Between } from 'typeorm';

@Injectable()
export class StopService {
  async getStops(agencyId: string) {
    return Stop.find({
      where: { agency_id: agencyId },
      select: {
        stop_id: true,
        stop_code: true,
        stop_name: true,
        stop_lat: true,
        stop_lon: true,
        wheelchair_boarding: true,
        stop_shelter: true,
      },
      order: { stop_name: 'ASC' },
    });
  }

  async getStopsFromArea(area: AreaDto) {
    return Stop.find({
      where: {
        stop_lat: Between(area.minLat, area.maxLat),
        stop_lon: Between(area.minLon, area.maxLon),
      },
      select: {
        agency_id: true,
        stop_id: true,
        stop_code: true,
        stop_name: true,
        stop_lat: true,
        stop_lon: true,
        wheelchair_boarding: true,
        stop_shelter: true,
      },
      order: { agency_id: 'ASC', stop_name: 'ASC' },
    });
  }

  async getStopById(agencyId: string, stopId: string) {
    return Stop.findOne({
      where: { stop_id: stopId, agency_id: agencyId },
      select: {
        stop_id: true,
        stop_code: true,
        stop_name: true,
        stop_desc: true,
        stop_lat: true,
        stop_lon: true,
        zone_id: true,
        stop_url: true,
        location_type: true,
        parent_station: true,
        stop_timezone: true,
        wheelchair_boarding: true,
        level_id: true,
        platform_code: true,
        stop_shelter: true,
        route_ids: true,
      },
    });
  }

  async getStopsByRouteId(agencyId: string, routeId: string) {
    return Stop.createQueryBuilder('stops')
      .innerJoinAndMapMany(
        'stops.times',
        Time,
        'times',
        'stops.agency_id = times.agency_id AND stops.stop_id = times.stop_id',
      )
      .innerJoinAndMapMany(
        'stops.trips',
        Trip,
        'trips',
        'trips.agency_id = times.agency_id AND trips.trip_id = times.trip_id',
      )
      .where('trips.agency_id = :agencyId AND trips.route_id = :routeId', {
        agencyId,
        routeId,
      })
      .select([
        'stops.stop_id AS stop_id',
        'stops.stop_code AS stop_code',
        'stops.stop_name AS stop_name',
        'stops.stop_desc AS stop_desc',
        'stops.stop_lat AS stop_lat',
        'stops.stop_lon AS stop_lon',
        'stops.zone_id AS zone_id',
        'stops.stop_url AS stop_url',
        'stops.location_type AS location_type',
        'stops.parent_station AS parent_station',
        'stops.stop_timezone AS stop_timezone',
        'stops.wheelchair_boarding AS wheelchair_boarding',
        'stops.level_id AS level_id',
        'stops.platform_code AS platform_code',
        'stops.stop_shelter AS stop_shelter',
        'stops.route_ids AS route_ids',
      ])
      .distinct(true)
      .execute();
  }

  async getStopsByTripId(agencyId: string, tripId: string) {
    return Stop.createQueryBuilder('stops')
      .innerJoinAndMapMany(
        'stops.times',
        Time,
        'times',
        'stops.agency_id = times.agency_id AND stops.stop_id = times.stop_id',
      )
      .innerJoinAndMapMany(
        'stops.trips',
        Trip,
        'trips',
        'trips.agency_id = times.agency_id AND trips.trip_id = times.trip_id',
      )
      .where('trips.agency_id = :agencyId AND trips.trip_id = :tripId', {
        agencyId,
        tripId,
      })
      .select([
        'stops.stop_id AS stop_id',
        'stops.stop_code AS stop_code',
        'stops.stop_name AS stop_name',
        'stops.stop_desc AS stop_desc',
        'stops.stop_lat AS stop_lat',
        'stops.stop_lon AS stop_lon',
        'stops.zone_id AS zone_id',
        'stops.stop_url AS stop_url',
        'stops.location_type AS location_type',
        'stops.parent_station AS parent_station',
        'stops.stop_timezone AS stop_timezone',
        'stops.wheelchair_boarding AS wheelchair_boarding',
        'stops.level_id AS level_id',
        'stops.platform_code AS platform_code',
        'stops.stop_shelter AS stop_shelter',
        'stops.route_ids AS route_ids',
      ])
      .execute();
  }

  async updateStop(stopDtos: StopDto[]) {
    const stop = Stop.create(stopDtos as Stop[]);
    return Stop.insert(stop);
  }
}
