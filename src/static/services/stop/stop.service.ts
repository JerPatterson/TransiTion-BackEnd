import { Injectable } from '@nestjs/common';
import { Stop } from 'src/entities/Stop';
import { Time } from 'src/entities/Time';
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
        location_type: true,
        parent_station: true,
        wheelchair_boarding: true,
        stop_shelter: true,
        stop_display: true,
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
        stop_lat: true,
        stop_lon: true,
      },
    });
  }

  async getStopById(agencyId: string, stopId: string) {
    return Stop.findOne({
      where: { stop_id: stopId, agency_id: agencyId },
      select: {
        agency_id: true,
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
        stop_display: true,
      },
    });
  }

  async getStopsByRouteId(agencyId: string, routeId: string) {
    const res = Stop.createQueryBuilder('stop')
      .leftJoinAndSelect(Time, 'time', 'stop.stop_id = time.stop_id')
      .where('time.agency_id = :agencyId AND time.route_id = :routeId', {
        agencyId,
        routeId,
      })
      .select([
        'stop.agency_id',
        'stop.stop_id',
        'stop.stop_code',
        'stop.stop_name',
        'stop.stop_desc',
        'stop.stop_lat',
        'stop.stop_lon',
        'stop.zone_id',
        'stop.stop_url',
        'stop.location_type',
        'stop.parent_station',
        'stop.stop_timezone',
        'stop.wheelchair_boarding',
        'stop.level_id',
        'stop.platform_code',
        'stop.stop_shelter',
        'stop.stop_display',
      ])
      .execute();

    console.log(res);
    return res;
  }

  async getStopsByTripId(agencyId: string, tripId: string) {
    return Stop.createQueryBuilder('stop')
      .leftJoinAndSelect(Time, 'time', 'stop.stop_id = time.stop_id')
      .where('time.agency_id = :agencyId AND time.trip_id = :tripId', {
        agencyId,
        tripId,
      })
      .select([
        'stop.agency_id',
        'stop.stop_id',
        'stop.stop_code',
        'stop.stop_name',
        'stop.stop_desc',
        'stop.stop_lat',
        'stop.stop_lon',
        'stop.zone_id',
        'stop.stop_url',
        'stop.location_type',
        'stop.parent_station',
        'stop.stop_timezone',
        'stop.wheelchair_boarding',
        'stop.level_id',
        'stop.platform_code',
        'stop.stop_shelter',
        'stop.stop_display',
      ])
      .execute();
  }

  async updateStop(stopDtos: StopDto[]) {
    const stop = Stop.create(stopDtos as Stop[]);
    return Stop.insert(stop);
  }
}
