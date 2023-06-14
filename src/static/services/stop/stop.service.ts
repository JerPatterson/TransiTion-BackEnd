import { Injectable } from '@nestjs/common';
import { Agency } from 'src/entities/Agency';
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
    return this.uniqueByKey(
      (
        await Time.find({
          relations: { stop: true },
          where: { trip: { route_id: routeId }, agency_id: agencyId },
          select: {
            stop: {
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
          },
        })
      ).map((time) => time.stop),
    );
  }

  async updateStop(agencyId: string, stopDto: StopDto) {
    const stop = Stop.create({ ...stopDto });
    stop.agency = await Agency.findOne({ where: { agency_id: agencyId } });
    return Stop.save(stop);
  }

  private uniqueByKey(array: Stop[]) {
    const seen = {};
    return array.filter((element) => {
      const k = element.stop_id;
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }
}
